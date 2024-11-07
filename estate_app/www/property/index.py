import frappe

def get_context(context):
    properties = frappe.db.sql("""
                                SELECT name, property_name, status, address, grand_total, image 
                                FROM `tabProperty`;
                               """,as_dict=True)

    context.properties = properties

    return context