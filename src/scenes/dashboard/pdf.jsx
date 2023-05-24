import jsPDFInvoiceTemplate,{ OutputType, jsPDF } from "jspdf-invoice-template";
export function generatePdf(data){
  
 
  
    var props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "All Users Report",
      orientationLandscape: false,
      compress: true,
      logo: {
          src: "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhdGUlMjBvZiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
          type: 'PNG', //optional, when src= data:uri (nodejs case)
          width: 53.33, //aspect ratio = width/height
          height: 26.66,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      stamp: {
          inAllPages: true, //by default = false, just in the last page
          src: "https://marketplace.canva.com/EAFXIvlL2Ns/2/0/800w/canva-brown-and-black-vintage-food-restaurant-logo-ESCrkYufizE.jpg",
          type: 'JPG', //optional, when src= data:uri (nodejs case)
          width: 20, //aspect ratio = width/height
          height: 20,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      business: {
          name: "CookITUP Recipe",
          address: "Johannesburg, Braimfontein,  2001",
          phone: "(+27) 011 11 11 111",
          email: "cookitup2023@gmail.com",
          email_1: "info@cookitup.co.za",
          website: "www.cookitup.com",
      },
      contact: {
          label: "Report issued for:",
          name: "All CookITUP User",
         
      },
      invoice: {
          label: "Report #: ",
          num: 194582,
          invDate: "Report Date: " +new Date(),
         
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#", 
              style: { 
                width: 10 
              } 
            }, 
            { 
              title: "Username",
              style: {
                width: 80
              } 
            }, 
            { 
              title: "Email",
              style: {
                width: 80
              } 
            }, 
           
          ],
          table:  data.map((item,index)=>([
            index + 1,
            item.name,
            item.email,
           
        ])),
         
          additionalRows: [{
              col1: 'All User Total:',
              col2: String(data.length),
              col3: 'ALL',
              style: {
                  fontSize: 14 //optional, default 12
              }
          },
          ],
          invDescLabel: "Report Note",
          invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
      },
      footer: {
          text: "The report is created on a computer and is valid without the signature and stamp.",
      },
      pageEnable: true,
      pageLabel: "Page ",
  };
  jsPDFInvoiceTemplate(props); 
  }

  export function generatePdf2(data){
  
 
  
    var props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "Active Users Report",
      orientationLandscape: false,
      compress: true,
      logo: {
          src: "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhdGUlMjBvZiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
          type: 'PNG', //optional, when src= data:uri (nodejs case)
          width: 53.33, //aspect ratio = width/height
          height: 26.66,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      stamp: {
          inAllPages: true, //by default = false, just in the last page
          src: "https://marketplace.canva.com/EAFXIvlL2Ns/2/0/800w/canva-brown-and-black-vintage-food-restaurant-logo-ESCrkYufizE.jpg",
          type: 'JPG', //optional, when src= data:uri (nodejs case)
          width: 20, //aspect ratio = width/height
          height: 20,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      business: {
          name: "CookITUP Recipe",
          address: "Johannesburg, Braimfontein,  2001",
          phone: "(+27) 011 11 11 111",
          email: "cookitup2023@gmail.com",
          email_1: "info@cookitup.co.za",
          website: "www.cookitup.com",
      },
      contact: {
          label: "Report issued for:",
          name: "All CookITUP Admin",
         
      },
      invoice: {
          label: "Report #: ",
          num: 194582,
          invDate: "Report Date: " +new Date(),
         
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#", 
              style: { 
                width: 10 
              } 
            }, 
            { 
              title: "Username",
              style: {
                width: 80
              } 
            }, 
            { 
              title: "Email",
              style: {
                width: 80
              } 
            }, 
           
          ],
          table:  data.map((item,index)=>([
            index + 1,
            item.name,
            item.email,
           
        ])),
         
          additionalRows: [{
              col1: 'Active User Total:',
              col2: String(data.length),
              col3: 'ALL',
              style: {
                  fontSize: 14 //optional, default 12
              }
          },
          ],
          invDescLabel: "Report Note",
          invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
      },
      footer: {
          text: "The report is created on a computer and is valid without the signature and stamp.",
      },
      pageEnable: true,
      pageLabel: "Page ",
  };
  jsPDFInvoiceTemplate(props); 
  }
  export function generatePdf3(data){
  
 
  
    var props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "Total Recipe Report",
      orientationLandscape: false,
      compress: true,
      logo: {
          src: "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhdGUlMjBvZiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
          type: 'PNG', //optional, when src= data:uri (nodejs case)
          width: 53.33, //aspect ratio = width/height
          height: 26.66,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      stamp: {
          inAllPages: true, //by default = false, just in the last page
          src: "https://marketplace.canva.com/EAFXIvlL2Ns/2/0/800w/canva-brown-and-black-vintage-food-restaurant-logo-ESCrkYufizE.jpg",
          type: 'JPG', //optional, when src= data:uri (nodejs case)
          width: 20, //aspect ratio = width/height
          height: 20,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      business: {
          name: "CookITUP Recipe",
          address: "Johannesburg, Braimfontein,  2001",
          phone: "(+27) 011 11 11 111",
          email: "cookitup2023@gmail.com",
          email_1: "info@cookitup.co.za",
          website: "www.cookitup.com",
      },
      contact: {
          label: "Report issued for:",
          name: "All CookITUP Admin",
         
      },
      invoice: {
          label: "Report #: ",
          num: 194582,
          invDate: "Report Date: " +new Date(),
         
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#", 
              style: { 
                width: 10 
              } 
            }, 
            { 
              title: "Recipe Name",
              style: {
                width: 80
              } 
            }, 
            { 
              title: "Recipe Country",
              style: {
                width: 40
              } 
            }, 
            { 
                title: "Recipe Idmeal",
                style: {
                  width: 60
                } 
              }, 
           
          ],
          table:  data.map((item,index)=>([
            index + 1,
            item.recipe_name,
            item.recipe_country,
            item.idmeal,
        ])),
         
          additionalRows: [{
              col1: 'Total Saved Recipes:',
              col2: String(data.length),
              col3: 'ALL',
              style: {
                  fontSize: 14 //optional, default 12
              }
          },
          ],
          invDescLabel: "Report Note",
          invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
      },
      footer: {
          text: "The report is created on a computer and is valid without the signature and stamp.",
      },
      pageEnable: true,
      pageLabel: "Page ",
  };
  jsPDFInvoiceTemplate(props); 
  }

  export function generatePdf4(data){
  
 
  
    var props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "Trending Recipe Report",
      orientationLandscape: false,
      compress: true,
      logo: {
          src: "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhdGUlMjBvZiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
          type: 'PNG', //optional, when src= data:uri (nodejs case)
          width: 53.33, //aspect ratio = width/height
          height: 26.66,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      stamp: {
          inAllPages: true, //by default = false, just in the last page
          src: "https://marketplace.canva.com/EAFXIvlL2Ns/2/0/800w/canva-brown-and-black-vintage-food-restaurant-logo-ESCrkYufizE.jpg",
          type: 'JPG', //optional, when src= data:uri (nodejs case)
          width: 20, //aspect ratio = width/height
          height: 20,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      business: {
          name: "CookITUP Recipe",
          address: "Johannesburg, Braimfontein,  2001",
          phone: "(+27) 011 11 11 111",
          email: "cookitup2023@gmail.com",
          email_1: "info@cookitup.co.za",
          website: "www.cookitup.com",
      },
      contact: {
          label: "Report issued for:",
          name: "All CookITUP Admin",
         
      },
      invoice: {
          label: "Report #: ",
          num: 194582,
          invDate: "Report Date: " +new Date(),
         
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#", 
              style: { 
                width: 10 
              } 
            }, 
            { 
              title: "Recipe Name",
              style: {
                width: 80
              } 
            }, 
            { 
              title: "Recipe Country",
              style: {
                width: 40
              } 
            }, 
            { 
                title: "Recipe Idmeal",
                style: {
                  width: 60
                } 
              }, 
           
          ],
          table:  data.map((item,index)=>([
            index + 1,
            item.recipe_name,
            item.recipe_country,
            item.idmeal,
        ])),
         
          additionalRows: [{
              col1: 'Total Trending Recipes:',
              col2: String(data.length),
              col3: 'ALL',
              style: {
                  fontSize: 14 //optional, default 12
              }
          },
          ],
          invDescLabel: "Report Note",
          invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
      },
      footer: {
          text: "The report is created on a computer and is valid without the signature and stamp.",
      },
      pageEnable: true,
      pageLabel: "Page ",
  };
  jsPDFInvoiceTemplate(props); 
  }