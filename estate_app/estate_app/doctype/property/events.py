import frappe
from estate_app.utils import sendmail

def validate(doc, event):
    pass
    # print(f'\n\n\n {doc}, {event}')
    # frappe.throw('Validate Event')



def on_update(doc, event):
    # frappe.msgprint(f'{doc.name} has been Updated by {doc.owner}')
    pass


def after_insert(doc, event):
    pass
    # Create note on property insert
    # note = frappe.get_doc({
    #     'doctype':'Note',
    #     'title':f'{doc.name} Added',
    #     'public':True, 
    #     'content':doc.descriptions,
    #     })
    
    # note.insert()
    # frappe.db.commit()
    # frappe.msgprint(f"{note.title} has been created.")


    # # Fetch agent email correctly
    # agent_email = frappe.get_value('Agent', doc.agent, 'email')
    # if not agent_email:
    #     frappe.msgprint(f"No email found for agent {doc.agent_name}")
    #     return

    # # Send email
    # # msg = f'Hello <b>{doc.agent_name}</b>, a property has been created on your behalf.'
    # # title = f"Sales Invoice {doc.name}"
    # msg = f"
    #     <p>Dear {doc.agent_name},</p>
    #     <p>Your invoice {doc.name} has been successfully generated.</p>
    #     <p>Total Amount: {doc.grand_total}.</p>
    #     <p>Thank you for your business!</p>
    #     "
    
    # # Attachments - print for debugging
    # attachments = [frappe.attach_print(doc.doctype, doc.name, file_name=doc.name)]
    # # frappe.msgprint(f'Attachments: {attachments}')

    # sendmail(doc, [agent_email, 'anjali.sigzen@gmail.com'], msg, 'New Property', attachments)
    # frappe.msgprint(f'Email sent successfully to {agent_email}')




     
