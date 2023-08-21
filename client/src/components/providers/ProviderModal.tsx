
import Modal from '@elements/Modal'
import ProviderModalBody from './ProviderModalBody'
import ProviderModalFooter from './ProviderModalFooter'
export default function ProviderModal({ show, hideModal, form,onClick, onChange }: any) {
  console.log({form})
  return (
    <div>
      <Modal
        title="Manage Provider"
        modalSizeCss="w-11/12 md:w-2/3 lg:w-1/2" 
        show={show} 
        onClose={hideModal}
        body={<ProviderModalBody 
          form={form} 
          onChange={onChange} 
        />}
        footer={<ProviderModalFooter onClick={onClick} 
        />
      } 
      />
    </div>
  )
}
