import React, { useState } from 'react'
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import {Textarea } from "flowbite-react";


const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Sci-Fi",
    "Horror",
    "Fantasy",
    "Bibliography",
    "History",
    "Self-Help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Art and Design"
  ]

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
  const handleChangeSelectedValue = (event) =>{
    console.log(event.target.value)
    setSelectedBookCategory(event.target.value)
  }

  //Handle Submission
  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const authorName = form.authorName.value
    const imageURL = form.imageURL.value
    const category = form.categoryName.value
    const description = form.description.value
    const title = form.title.value;
    const pdfURL = form.pdfURL.value
    const price = form.price.value

    const bookObject = {
      authorName,imageURL,category,description,title,pdfURL,price
    }

    // console.log(bookObject)

    // Send Data to Database
    fetch("http://localhost:3000/upload-book", {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(bookObject)
    }).then(res => res.json()).then(data=>{
      alert("Book has been Uploaded Successfully!")

      form.reset();
    })

    }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'> Upload a Book</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">

        
        {/* First Row */}
        <div className='flex gap-8'>

          {/* Title */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Book Title" />
            </div>
            <TextInput id="title" name = "title" type="text" placeholder="Book Name" required />
          </div>

            {/* Author */}
            <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" name = "authorName" type="text" placeholder="Author Name" required />
          </div>

        </div>

        {/* Second Row */}
        <div className='flex gap-8'>

          {/* Image URL */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput id="imageURL" name = "imageURL" type="text" placeholder="Book Image URL" required />
          </div>

          {/* Category */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
                <Label htmlFor="inputState" value="Book Category" />
            </div>

            <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}> 
              {
                bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
              }
            </Select>
          </div>

        </div>

        {/* Third Row */}
        
        {/* Book Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Write your Book Description..." />
          </div>
          <Textarea id="description" name ="description" placeholder="Book Description" required rows={6} className='w-full'/>

        </div>


        {/* Book PDF Link */}
        <div>
        <div className="mb-2 block">
          <Label htmlFor="pdfURL" value="Book PDF URL" />
        </div>
        <TextInput id="pdfURL" name = "pdfURL" type="text" placeholder="Book PDF URL" required />
      </div>

      {/* Price */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Price" />
        </div>
        <TextInput id="price" name = "price" type="number" placeholder="$" step="0.01" required />
      </div>

      {/* Button */}
      <Button type="submit" className='mt-5'>Upload Book</Button>

    </form>
    </div>
  )
}

export default UploadBook 