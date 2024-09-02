from django.test import TestCase, Client
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from datetime import datetime
import io
import csv


class ProcessCSVIntegrationTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.upload_url = reverse('process_csv')

    def test_process_csv(self):
        csv_data = (
            b'name,governmentId,email,debtAmount,debtDueDate,debtId\n'
            b'John Doe,123456789,johndoe@example.com,100.00,2024-07-15,987654321\n'

        )
        csv_file = SimpleUploadedFile('file.csv', csv_data, content_type='text/csv')

        response = self.client.post(self.upload_url, {'file': csv_file})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'success'})



    def tearDown(self):
        pass
