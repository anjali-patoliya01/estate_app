import frappe

def get_context(context):
    context.property_details = frappe.get_doc('Property', 'abc')
    context.agent = frappe.get_doc("Agent", context.property_details.agent)
    return context

