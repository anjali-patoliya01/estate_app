// $('#agent-form').submit(e=>{
//     e.preventDefault();
//     //upload method
//     makecall();
//     // console.log(e.target)
// })


// //upload method
// let makecall =async()=>{
//     let formdata = $('#agent-form').serializeArray().reduce(
//         (obj, item)=>(obj[item.name]=item.value, obj),{}
//     );
//     let imagedata = $('#image')[0].files[0];
//     //initialize form
//     let imagefile = new FormData()
//     if(imagedata){
//         imagefile.append('file',imagedata);
//     }
//     // end initialize

//     //post to API 
//     if(formdata){
//         let res = await $.ajax({
//             url:`/api/resource/Agent/${res.data.name}`,
//             type: 'PUT',
//             Headers: {
//                 'Content-Type': 'application/json',
//                 'X-Frappe-CSRF-Token': frappe.csrf_token
//             },
//             data: JSON.stringify({image:data.message.files_url}),
//             success: function(data){
//                 return data
//             }
//         })
//         console.log(res);
//         if(res.data && imagedata){
//             let imgres = await fetch('/api/method/upload_file', {
//                 Headers: {
//                     'X-Frappe-CSRF-Token': frappe.csrf_token
//                 },
//                 method: 'POST',
//                 body: imagefile
//             })
//             .then(res=>res.json())
//             .then(data=>{
//                 console.log(data);
//                 //finally update document
//                 if(data.message){
//                     //update agent
//                     $.ajax({
//                         url:'/api/resource/Agent',
//                         type: 'POST',
//                         Headers: {
//                             'Content-Type': 'application/json',
//                             'X-Frappe-CSRF-Token': frappe.csrf_token
//                         },
//                         data: JSON.stringify(formdata),
//                         success: function(data){
//                             return data
//                         },
//                         error: function(data){
//                             return data
//                         }
                        
//                     })
//                     //end update agent
//                 }
//             })
//         }
//     }
// }

// -------------------------------------------

$('#agent-form').submit(e => {
    e.preventDefault();
    makecall();
});

// Upload method
let makecall = async () => {
    let formdata = $('#agent-form').serializeArray().reduce(
        (obj, item) => (obj[item.name] = item.value, obj), {}
    );
    let imagedata = $('#image')[0].files[0];

    // Initialize FormData for image upload
    let imagefile = new FormData();
    if (imagedata) {
        imagefile.append('file', imagedata);
    }

    // Get CSRF token from meta tag
    let csrf_token = $('meta[name="csrf-token"]').attr('content');

    // Post to API
    if (formdata) {
        // First API call to save or update agent and get res
        let res = await $.ajax({
            url: `/api/resource/Agent`, // Modify as necessary
            type: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': csrf_token
            },
            data: JSON.stringify(formdata),
            success: function(data) {
                return data;
            },
            error: function(error) {
                console.error("Error in saving agent: ", error);
            }
         
        });

        console.log(res);

        // After getting res, use the agent's name in the URL
        if (res.data && imagedata) {
            // Upload image to a different endpoint
            let imgres = await fetch('/api/method/upload_file', {
                headers: {
                    'X-Frappe-CSRF-Token': csrf_token
                },
                method: 'POST',
                body: imagefile
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                // Finally update the agent with the image URL
                if (data.message) {
                    $.ajax({
                        url: `/api/resource/Agent/${res.data.name}`, // Now you can use res.data.name
                        type: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Frappe-CSRF-Token': csrf_token
                        },
                        data: JSON.stringify({ image: data.message.file_url }),
                        success: function(data) {
                            console.log("Agent updated with image:", data);
                        },
                        error: function(error) {
                            console.error("Error updating agent:", error);
                        }
                    });
                }
            })
            .catch(error => {
                console.error("Error in image upload: ", error);
            });
        }
    }
};



// -------------------------------------

// $(document).ready(function() {
//     $('#agent-form').submit(e => {
//         e.preventDefault();
//         makecall();
//     });

//     // Upload method
//     let makecall = async () => {
//         let formdata = $('#agent-form').serializeArray().reduce(
//             (obj, item) => (obj[item.name] = item.value, obj), {}
//         );
//         let imagedata = $('#image')[0].files[0];

//         // Initialize form
//         let imagefile = new FormData();
//         if (imagedata) {
//             imagefile.append('file', imagedata);
//         }

//         // Post to API
//         if (formdata) {
//             let res = await $.ajax({
//                 url: '/api/resource/Agent',
//                 type: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-Frappe-CSRF-Token': frappe.csrf_token
//                 },
//                 data: JSON.stringify(formdata),
//                 success: function(data) {
//                     return data;
//                 }
//             });
//             console.log(res);
//         }
//     };
// });




// ------------------------------------------------------------------------------------

// const imagefile = new FormData();  // Use const if imagefile is not reassigned
// imagefile.append('file_url', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGPdYPCvewick1R5TBAz_1W_fvzmdogfcgMQ&s');

// // append as attachment
// imagefile.append('doctype','Agent');
// imagefile.append('docname','AG-PR-24-10-00030');

// fetch('/api/method/upload_file', {
//     headers: {
//         'X-Frappe-CSRF-Token': frappe.csrf_token
//     },
//     method: 'POST',
//     body: imagefile
// })
// .then(res => res.json())
// .catch(error => console.error("Error:", error));
