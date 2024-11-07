// Copyright (c) 2024, sigzen and contributors
// For license information, please see license.txt


// ------------------------------- Custom Script ------------------------------- 

frappe.ui.form.on("Property", {
    setup: function(frm) {
        // Function to check for duplicate amenities
        frm.check_amenities_duplicate = function(frm, row) {
            frm.doc.amenities.forEach(item => {
                // Check if amenity name is a duplicate and not from the same row
                if (row.idx !== item.idx && row.amenity_name && row.amenity_name === item.amenity_name) {
                    // Clear the field and throw an error
                    row.amenity_name = '';
                    frappe.throw(__(`Amenity ${item.amenity_name} already exists in row ${item.idx}`));
                    frm.refresh_field('amenities');
                }
            });
        };

        // Function to check if Outdoor Kitchen is allowed in a Flat
        frm.check_flat_against_outdoor_kitchen = function(frm, row) {
            if (row.amenity_name === 'Outdoor Kitchen' && frm.doc.property_type === "Flat") {
                // Clear the field and throw an error
                row.amenity_name = '';
                frappe.throw(__(`Outdoor Kitchen cannot exist in a Flat property type`));
                frm.refresh_field('amenities');
            }
        };


        // Calculation of Grand Total
        frm.compute_total = function(frm) {
            let total = 0;
        
            // Loop through the child table (amenities)
            frm.doc.amenities.forEach(d => {
                if (d.amenity_price) {
                    total += d.amenity_price;
                } else {
                    console.warn(`Missing amenity_price for row ${d.idx}`);  
                }
            });
        
            // property_price is defined, otherwise default to 0
            let property_price = frm.doc.property_price || 0;
        
            // Calculate new total
            let new_total = property_price + total;
        
            // Apply discount if present
            if (frm.doc.discount) {
                new_total = new_total - (new_total * (frm.doc.discount / 100));
            }
        
            // Debugging output to ensure values are correct
            console.log('Property price:', property_price);
            console.log('Total amenities price:', total);
            console.log('Grand Total (after discount if applicable):', new_total);
        
            // Set the grand total field value
            frm.set_value('grand_total', new_total);
        
            // Refresh the grand total field to update the UI
            frm.refresh_field('grand_total');
        };

        // copy discount to amenities
        frm.copy_discount = function(frm){
            frm.doc.amenities.forEach(d=>{
                d.discount = frm.doc.discount;

            })
            frm.refresh_field('amenities')
        };


        // Calculate when change in property_price and Discount 
        property_price= function(frm){
            frm.compute_total(frm);
        };


        discount = function(frm){
            frm.copy_discount(frm);
            frm.compute_total(frm);
        };

    },
    


// -------------------------------------------------------------------
	refresh: function(frm) {


        // //  -------------- Custom buttons  -------------- 

        // frm.add_custom_button('Say Hi', () =>{
        //     frappe.msgprint(__("Document updated successfully"))
        // })

          // Custom buttons in groups
        //   frm.add_custom_button('Closed', () => {
        //     fr
        // frm.compute_total = function(frm, row) {
        //     let total = 0;
        
        //     // Loop through the child table (amenities)
        //     frm.doc.amenities.forEach(d => {
        //         // Ensure amenity_price is defined and valid before adding to the total
        //         if (d.amenity_price) {
        //             total += d.amenity_price;
        //         } else {
        //             console.warn(`Missing amenity_price for row ${d.idx}`);  // Warn if amenity_price is missing
        //         }
        //     });
        
        //     // Debugging output to ensure values are correct
        //     console.log('Property price:', frm.doc.property_price || 'undefined');
        //     console.log('Total amenities price:', total);
        
        //     // Ensure property_price is defined, otherwise default to 0
        //     let property_price = frm.doc.property_price || 0;
        
        //   m.doc.status = 'Closed'
        // }, 'Set Status');



        //  --------------  frappe dialog API  -------------- 

        frm.add_custom_button('Say Hii',() =>{

        //     // -------- Only msg -------- 
        //     frappe.msgprint(__("Document updated successfully"));

        //     // -------- With option -------- 
        //     frappe.msgprint({
        //         title: __('Notification'),
        //         indicator: 'green',
        //         message: __('Document updated successfully')
        //     });


            // -------------- Prompt ----------------
            frappe.prompt("Address", ({ value }) => {
                if(value){
                    frm.set_value('address',value);
                    frm.refresh_field('address')
                    frappe.msgprint(__(`Address field update with ${value}`));
                }
                })
             }, "Actions");

            //  Check property types
            frm.add_custom_button('Check Property Types',()=>{
                let property_type = frm.doc.property;
                console.log(property_type);
                //make ajax call
                frappe.call({
                    method: "estate_app.estate_app.doctype.property.api.check_propery_types",
                    args: {'property_type': property_type},
                    callback: function(r){
                       console.log(r);
                       if(r.message.length>0){
                        let header = `<h3>Below properties has is of type ${property_type}</h3>`;
                        let body = ``;
                        r.message.forEach(d=>{
                            let cont = `<p>Name : ${d.name}: <a href = '/app/property/${d.name}'>Visit</a></p>`;
                            body = body + cont;
                        })
                        let all = header + body;  
                        
                        //msgprint
                        frappe.msgprint(__(all))
                        }
                    }
                });
            }, "Actions");


            // the total is calculated when the form is refreshed
            frm.compute_total(frm);  

    }
      
	
});





// ----------------- AMENITIES CHILD TABLE -----------------
frappe.ui.form.on('Property Amenity Detail', {
    amenity_name: function(frm, cdt, cdn) {
        // cdt = child doc type
        // cdn = child doc name
        let row = locals[cdt][cdn];
        console.log(row);

        // Check for duplicate amenities
        frm.check_amenities_duplicate(frm, row);

        // Check if amenity is Outdoor Kitchen in a Flat property
        frm.check_flat_against_outdoor_kitchen(frm, row);

        // Calculation of Grand Total
        frm.compute_total(frm);
    },

    amenities_remove: function(frm, cdt, cdn){
        frm.compute_total(frm);
    },

    copy: function(frm,cdt, cdn){
        frm.copy_discount(frm);
    },
});




