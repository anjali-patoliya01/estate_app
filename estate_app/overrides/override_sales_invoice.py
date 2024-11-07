import frappe
from erpnext.accounts.doctype.sales_invoice.sales_invoice import SalesInvoice

class SalesInvoiceCustom(SalesInvoice):
    
    def get__crypto_prices(self):
        '''
           Get grand_total in BTC, ETH
        '''
        print('Hello, getting prices')
        return "Processing price"