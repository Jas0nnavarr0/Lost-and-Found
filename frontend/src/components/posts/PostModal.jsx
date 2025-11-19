import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

function PostModal({open, setOpen, post}) {

  const {id, postTitle, image, description,location} = post
  const handleOpenOnClick = () => {
    setOpen(true);
  }

  return (
    <>

      <Dialog open={open} as="div" className="relative z-10" onClose={close}>
        <DialogBackdrop className="fixed inset-0 bg-gray-450 bg-opacity-71 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px] w-full"
            >
                {image && (
                    <div className='flex justify-center  aspect-[3/2]'>
                    <img 
                    src={image}
                    alt={postTitle}/>
                    </div>
                )}

                
                <div className='px-6 pt-10 pb-2'>
                    <DialogTitle as="h2" className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-750 mb-4">
                        {postTitle}
                    </DialogTitle>

                    <div className="px-6 py-4 flex justify-end gap-4">
                        <button
                            onClick={() => setOpen(false)}
                            type="button"
                            className="px-4 py-2 text-sm- font-semibold text-slate-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
              
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default PostModal;