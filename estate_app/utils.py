import frappe

def sendmail(doc, recipients, msg, title, attachments=None):
    try:
        email_args = {
            'recipients':recipients,
            'message': msg,
            'subject': title,
            'reference_doctype' : doc.doctype,
            'reference_name':doc.name,
        }
        if attachments:
            email_args['attachments'] = attachments

        # send mail
        frappe.enqueue(
            method=frappe.sendmail, 
            queue='short',
            timeout=300, 
            **email_args
        )
        
    except Exception as e:
        error = frappe.log_error(frappe.get_traceback(), f'{e}')

        print(f'\n\n\n -------- {error} ------------- \n\n\n')
        frappe.msgprint(f"An error accurred see <a href = '/app/error-log/{error.name}'><b>{error.name}</b></a>")




# Jinja


def get_fullname(user):
    first_name, last_name = frappe.db.get_value("User", user, ["first_name", "last_name"])
    first_name = first_name or ""  # Default to empty string if None
    last_name = last_name or ""    # Default to empty string if None
    
    # Return the full name
    full_name = first_name + " " + last_name
    return full_name.strip()  # Strip any extra spaces if one of the names is missing


def format_currency(value, currency):
    result = currency + " " + str(value)
    return result








# import frappe

# def sendmail(doc, method):
#     try:
#         # Define the recipients (could be a static email or the customer email)
#         recipients = [doc.email] if doc.contact_email else ["agent5@gmail.com"]

#         # Email content
#         subject = f"Sales Invoice {doc.name}"
#         message = f"""
#         <p>Dear {doc.agent_name},</p>
#         <p>Your invoice {doc.name} has been successfully generated.</p>
#         <p>Total Amount: {doc.grand_total}.</p>
#         <p>Thank you for your business!</p>
#         """

#         # Send email
#         frappe.sendmail(
#             recipients=recipients,
#             subject=subject,
#             message=message,
#             reference_doctype=doc.doctype,
#             reference_name=doc.name
#         )
#         frappe.msgprint(f"Email sent successfully to {', '.join(recipients)}.")

#     except Exception as e:
#         frappe.log_error(frappe.get_traceback(), f"Email Sending Error for {doc.name}")
#         frappe.msgprint(f"Failed to send email for {doc.name}. Please check the error log.")
