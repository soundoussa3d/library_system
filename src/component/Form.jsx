import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';


function Form1() {
  const [data,setData]= useState();
  const [rows, setRows] = useState([]);
  const [products, setProducts] = useState([]);
  const [total , setTotal] = useState(0);
  const [orderdata,ordersetData]=useState({ 
    name: "",
    address: "",
    cellphone: ""
  });

  const addRow = () => {
    setRows([...rows, { id: Date.now(), bookId: '', quantity: 1 }]);
  };

  const removeRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const totalprice = () => {
    var total = 0 ; 
    rows.map(row => {
      const price = getBookPrice(row.bookId);
      total += price *row.quantity
    })
    setTotal(total);
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //save order information 
  const save = async () => {
    if (orderdata.name!== ""&&orderdata.address!== "" && orderdata.cellphone!== "") {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderdata),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
        console.log(data);
        //save order items
        await saved(data);

        //generate pdf
        generatePDF(data.id);

        //reset 
        ordersetData({
          name: "",
          address: "",
          cellphone: ""
        });
        setRows([]);
        setTotal(0);
        window.location.reload();
        
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
    else console.log('try again with all data inserted')

  };

  //save order Items 
  const saved = async (data) => {
    //console.log("dataaaa ",data);
    const d= data;
    for(let i=0;i<rows.length;i++){
        //rows.map(async(row)=>{
          const book = products.find(p=>p.id==rows[i].bookId);
          const item  = {
            book_id: parseInt(rows[i].bookId),
            order_id: parseInt(d.id),
            quantity: parseInt(rows[i].quantity),
            price:parseFloat(book.price)
          };
          try {
            const response = await fetch('http://127.0.0.1:8000/api/order-items', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(item),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error('Error:', error);
            // Handle validation errors
            if (error.message.includes('Validation')) {
              alert('Validation error: ' + error.message);
            }
          }
       // })
      }
      
  };

  //generate pdf 
  const generatePDF = (orderId) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Summary", 10, 10);
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 10, 20);
    doc.text(`Name: ${orderdata.name}`, 10, 30);
    doc.text(`Address: ${orderdata.address}`, 10, 40);
    doc.text(`Cellphone: ${orderdata.cellphone}`, 10, 50);

    const tableColumn = ["Item", "Book Title", "Quantity", "Price"];
    const tableRows = [];

    rows.forEach((row, index) => {
      const book = products.find(p => p.id == row.bookId);
      const rowData = [
        index + 1,
        book.title,
        row.quantity,
        `${book.price} $`
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
      margin: { top: 10 }
    });

    doc.text(`Total Price: ${total} $`, 10, doc.previousAutoTable.finalY + 10);

    // Show the PDF in a new window
    const pdfDataUri = doc.output('datauri');
    const pdfWindow = window.open();
    pdfWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
  };

  useEffect(() => {
    totalprice();
  }, [rows]);
  const handleBookChange = (index, bookId) => {
    const newRows = [...rows];
    newRows[index].bookId = bookId;
    setRows(newRows);
  };

  const handleQuantityChange = (index, quantity) => {
    const newRows = [...rows];
    newRows[index].quantity = quantity;
    setRows(newRows);
  };

  const getBookPrice = (bookId) => {
    const book = products.find(book => book.id === parseInt(bookId));
    return book ? book.price : 0;
  };
  


  const getAvailableBooks = (currentBookId) => {
    return products.filter(book => {
      return book.id === parseInt(currentBookId) || !rows.some(row => row.bookId === book.id.toString());
    });
  };

  return (
    <div class="ml-44 mt-10 border-2 border-blue-400 rounded-lg w-4/5 ">
  <div class="mt-10 text-center font-bold"> library</div>
  <div class="mt-3 text-center text-4xl font-bold">Make an order</div>
  <div class="p-8">
    <div class="flex gap-4">
      <input type="text" name="name" class="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" placeholder="Full Name *" onChange={(e)=>ordersetData({...orderdata , name:e.target.value})}/>
      <input type="text" name="text" class="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" placeholder="Cellphone *" onChange={(e)=>ordersetData({...orderdata , cellphone:e.target.value})} />
    </div>
    
    <div class="my-6 flex gap-4">
      <textarea name="textarea" id="text" cols="30" rows="10" class="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-300" placeholder='Address' onChange={(e)=>ordersetData({...orderdata , address:e.target.value})}></textarea>
    </div>
    <div class="text-center">
      <button class="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white"  onClick={addRow}>+ Add Books </button>
    </div>
  </div>
  {rows.map((row, index) => (
        <div key={row.id} className="row" style={{marginLeft:"30%"}}>
          <div class="my-6 flex gap-4">
      <select name="select" id="select" class="block w-1/5 rounded-md border border-slate-300 bg-white px-3 py-4 font-semibold text-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
      value={row.bookId}
      onChange={(e) => handleBookChange(index, e.target.value)}>
        <option  class="font-semibold text-slate-300">Select a book</option>
        <option value="">Select a book</option>
            {getAvailableBooks(row.bookId).map(book => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
      </select>
      <input type="number" name="text" class="mt-1 block w-1/6 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" placeholder="Cellphone *" value={row.quantity} min="1"
      onChange={(e) => handleQuantityChange(index, e.target.value)}/>
      <span style={{marginTop:"2%" , color:"blue"}}>Price:<span style={{fontWeight:"bold"}}> {getBookPrice(row.bookId)}$</span></span>
          <button style={{marginTop:"0.5%" ,color:"red"}} onClick={() => removeRow(row.id)}>Remove</button>
    </div>
        </div>
      ))}

      <div>
        <p style={{fontSize:"20px" , marginLeft:"45%"}}>total price : {total}</p> 
      </div>

      <div class="text-center" style={{ marginTop:"5%" , marginBottom:"5%"}}>
      {/* <button class="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white"  onClick={saved}  style={{ marginRight:"10%"}}> Generate pdf  </button> */}
      <button class="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white"  onClick={save}> Save Order  </button>
    </div>
</div>
  )
}

export default Form1