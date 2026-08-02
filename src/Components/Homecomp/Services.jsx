import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

const Services = () => {

    const arr = [
        {
            outline:"BE",
            heading:"Brand Identity",
            list:{
              list1:"brand Positioning",
              list2:"brand Positioning",
              list3:"brand Positioning",
              list4:"brand Positioning",
               
            }
        },
        {
            outline:"VE",
            heading:"Video Shooting to Editing",
            list:{
              list1:"brand Positioning",
              list2:"brand Positioning",
              list3:"brand Positioning",
              list4:"brand Positioning",
               
            }
        },
        {
            outline:"SC",
            heading:"Social Media Creative",
            list:{
              list1:"brand Positioning",
              list2:"brand Positioning",
              list3:"brand Positioning",
              list4:"brand Positioning",
               
            }
        },
        {
            outline:"DC",
            heading:"Digital & printable Creative",
            list:{
              list1:"brand Positioning",
              list2:"brand Positioning",
              list3:"brand Positioning",
              list4:"brand Positioning",
               
            }
        },
        {
            outline:"PS",
            heading:"Presentation designer",
            list:{
              list1:"brand Positioning",
              list2:"brand Positioning",
              list3:"brand Positioning",
              list4:"brand Positioning",
               
            }
        },
        {
            outline:"SH",
            heading:"Social Media Stratergy & Handelling",
            list:{
              list1:"digital design",
              list2:"brand Positioning",
              list3:"brand Positioning",
              list4:"brand Positioning",
               
            }
        }
    ]
     
    
    return (
        <div className='pt-[20vh] flex flex-col'>
            <div className='text-[7vw] font-medium p-10 mb-20 leading-[6vw]'>
                <h1>SERVICES <br /> WE PROVIDE</h1>
            </div>
            {arr.map((arr,index)=>{
                return <div key={index} className='h-[50vh] sm:h-[60vh] md:h-[40vh] border-t  relative px-10 w-full md:gap-[20vw] gap-5 flex flex-col md:flex-row md:items-center overflow-hidden'>
                <h1 className="text-[25vw] md:text-[15vw] md:hover:text-[20vw] transition-all font-bold text-transparent [-webkit-text-stroke:2px_white] leading-[25vw]  ">{arr.outline}</h1>
                <div className='flex flex-col lg:gap-5'>
                    <h1 className='text-2xl md:text-[2vw] font-medium'>{arr.heading}</h1>
                    <ul className='list-disc pl-5 text-sm md:text-xl '>
                        <li>{arr.list.list1}</li>
                        <li>{arr.list.list2}</li>
                        <li>{arr.list.list3}</li>
                        <li>{arr.list.list4}</li>
                    </ul>
                </div>
            </div>
            })}
        </div>
    )
}

export default Services