import frappe

@frappe.whitelist()
def check_propery_types(property_type):
    return frappe.db.sql("""
        SELECT name, property 
        FROM `tabProperty` 
        WHERE property = %s
    """, (property_type,), as_dict=True)
