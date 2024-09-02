import csv
import io
from datetime import datetime
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render
from .forms import UploadFileForm

def process_csv(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            csv_file = request.FILES['file']
            data = csv_file.read().decode('utf-8')
            io_string = io.StringIO(data)
            reader = csv.DictReader(io_string)
            for row in reader:
                name = row['name']
                government_id = row['governmentId']
                email = row['email']
                debt_amount = row['debtAmount']
                debt_due_date = datetime.strptime(row['debtDueDate'], '%Y-%m-%d')
                debt_id = row['debtId']
    
                boleto_url = generate_boleto(name, government_id, debt_amount, debt_due_date, debt_id)

                #simulacao para mostrar no console
                #settings.py: EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
                send_mail(
                    'Seu boleto',
                    f'Olá {name},\n\nSeu boleto está disponível em: {boleto_url}\n\nValor: {debt_amount}\nVencimento: {debt_due_date}\n\n Nº do documento: {government_id}',
                    'noreply@example.com',
                    [email],
                    fail_silently=False,
                )

            return JsonResponse({'status': 'success'})
    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form})

def generate_boleto(name, government_id, debt_amount, debt_due_date, debt_id):   
    return 'http://example.com/boleto/seuboleto'