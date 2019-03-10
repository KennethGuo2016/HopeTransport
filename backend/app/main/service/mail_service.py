from python_http_client.exceptions import HTTPError
import python_http_client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *

SG = SendGridAPIClient(apikey='apikey')

def send_email(data):
    from_email = Email(data['from'])
    to_email = Email(data['to'])
    subject = data['subject']
    content = Content("text/html", data['content'])

    try:
        mail = Mail(from_email, subject, to_email, content)
        response = _send_emails_sendgrid(mail.get())
    except HTTPError as e:
        # LOG - sendgrid error
        return 500

    # LOG - response
    return response.status_code

def _send_emails_sendgrid(data):
    return SG.client.mail.send.post(request_body=data)