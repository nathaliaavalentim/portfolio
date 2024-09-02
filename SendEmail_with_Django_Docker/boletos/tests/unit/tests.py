from django.test import TestCase, Client
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core import mail
from datetime import datetime

class ProcessCSVTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_process_csv(self):
        csv_content = """name,governmentId,email,debtAmount,debtDueDate,debtId
                         John Doe,12345678900,johndoe@example.com,150.00,2023-12-31,1"""
        csv_file = SimpleUploadedFile("test.csv", csv_content.encode('utf-8'), content_type="text/csv")
        
        response = self.client.post('/boletos/upload/', {'file': csv_file})
        
        if response.status_code == 200:
            self.assertJSONEqual(response.content, {'status': 'success'})
            self.assertEqual(len(mail.outbox), 1)
            email = mail.outbox[0]
            self.assertEqual(email.subject, 'Seu boleto')
            self.assertIn('John Doe', email.body)
            self.assertIn('150.0', email.body)
            self.assertIn('2023-12-31', email.body)
            self.assertIn('12345678900', email.body)
        else:
            self.fail(f'Response returned status code {response.status_code}, expected 200. Content: {response.content}')

    def test_process_csv_invalid_file(self):
        response = self.client.post('/boletos/upload/', {})
        
        # Verificando a resposta para um arquivo inválido
        #self.assertNotEqual(response.status_code, 200, f'Response returned status code {response.status_code}, expected not 200.')
        self.assertNotIn('success', response.content.decode('utf-8'))
        self.assertEqual(len(mail.outbox), 0)  
