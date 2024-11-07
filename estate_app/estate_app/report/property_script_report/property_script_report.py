# Copyright (c) 2024, sigzen and contributors
# For license information, please see license.txt


import frappe
from frappe import _
from frappe import msgprint


# def execute(filters=None):
# 	columns, data = [], []
# 	return columns, data


# def execute(filters=None):
# 	return get_columns(), get_data(filters)


# def get_data(filters):
# 	# data = frappe.db.sql(""" 
# 	# 				SELECT name,property_name,property,address,status,discount,agent,agent_name,property_price 
# 	# 				FROM `tabProperty`;
# 	# 			""")

# 	data = frappe.db.sql(""" 
# 					SELECT name,property_name,property,address 
# 					FROM `tabProperty`;
# 				""")

	
# 	return data


# def get_columns():
#     return[
# 		{
# 			"ID : Link/Property:70",
# 			"Property Name: Data:150",
# 			"Address:Data:150"
# 			"Type:Link/Property Type:50",
# 			# "Status:select:80",
# 			# "Prce:Currency:100",
# 			# "Discount:Precent:20",
# 			# "Agent:Data:100",
# 			# "Agent Name:Data:150"
# 		},
# 	]




def execute(filters=None):
	"""Return columns and data for the report.

	This is the main entry point for the report. It accepts the filters as a
	dictionary and should return columns and data. It is called by the framework
	every time the report is refreshed or a filter is updated.
	"""
	if not filters: 
		filters={}
	

	columns = get_columns()
	data = get_data(filters)

	if not data:
		msgprint(_("No record found"))

	all_data = []
	for d in data:
		row = {
			'property_name': d.property_name,
			'agent':d.agent,
			'status':d.status,
		}
		all_data.append(row)

	# chart = get_chart_data(all_data)
	# report_summary = get_report_summary(all_data)

	return columns, all_data, None


def get_columns() -> list[dict]:
	"""Return columns for the report.

	One field definition per column, just like a DocType field definition.
	"""
	return [
		{
			"label": _("Property Name"),
			"fieldname": "property_name",
			"fieldtype": "Data",
			"width" : '120'
		},
		{
			"label": _("Agent"),
			"fieldname": "agent",
			"fieldtype": "Link",
			'options':'Agent',
			"width" : '100'
		},

			{
			"label": _("Status"),
			"fieldname": "status",
			"fieldtype": "Select",
			"default": "",
			"options": ['','Sale','Rent','Lease'],
			"width" : 100,
		},
	]


# def get_data(filters) -> list[list]:
# 	"""Return data for the report.

# 	The report data is a list of rows, with each row being a list of cell values.
# 	"""
	# conditions = get_conditions(filters)
	# data = frappe.get_all(
	# 	doctype = 'Property',
	# 	fields = ['property_name', 'agent','status'],
	# 	filters = conditions,
	# 	order_by = 'property_name'
	# )
	# return data



# ---------- Using SQL Query  --------------

def get_data(filters) -> list[list]:
    """Return data for the report using an SQL query."""
    conditions = get_conditions(filters) 

    # Execute the SQL query with the filters as parameters
    data = frappe.db.sql("""
        SELECT
            property_name, agent, status
        FROM
            `tabProperty`
        WHERE
            1 = 1
    """, filters, as_dict=True)

    return data




def get_conditions(filters):
	"""Return conditions based on filters."""
	conditions = {}
	for key, value in filters.items():
		if value:
			conditions[key] = value

	return conditions




