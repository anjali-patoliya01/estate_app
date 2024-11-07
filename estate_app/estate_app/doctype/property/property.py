# Copyright (c) 2024, sigzen and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Property(Document):
	def after_insert(self):
		frappe.msgprint((f'Document {self.name} insertes successfully...'))

		
	def valiidate(self):
		if(self.property=="Flat"):
			# print('\n\n\n Flat \n\n\n')
			# for amenity in self.amenities:
			# 	if(amenity.amenity == 'Outdoor Kitchen'):
			# 		print('\n\n\n Found \n\n\n')
			# 		frappe.throw(f'Property of type <br> Flat</b> should not have amenity <b>{amenity.amenity_name}')


			# SQL
			amenity = frappe.db.sql(f""" 
						   SELECT amenity_name 
						   FROM `tabProperty Amenity Detail` 
						   WHERE parent='{self.name}' 
						   AND amenity_name='Sun Room';""", 
						   as_act=True)
			print(f""" \n\n {amenity} """)
			if(amenity):
				frappe.throw(f'Property of type <br> Flat</b> should not have amenity <b>{amenity.amenity_name}')


