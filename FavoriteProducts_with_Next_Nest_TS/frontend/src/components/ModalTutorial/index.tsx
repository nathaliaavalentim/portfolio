import Modal from 'react-modal';
import styles from './styles.module.scss';
import { useState } from "react";
import { useRouter } from 'next/router';
import { FiX } from 'react-icons/fi'
import { TutorialProps } from '../../pages/tutorials'


interface ModalTutorialProps{
  isOpen: boolean;
  onRequestClose: () => void;
  tutorials: TutorialProps[];
  handleFinishTutorial: (id: string) => void;
}


export function ModalTutorial({ isOpen, onRequestClose, tutorials, handleFinishTutorial}: ModalTutorialProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter(); 
 

  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1d1d2e'
    }
  };

  

  //Fechar o Modal
  function closeModal() {
    setModalVisible(false);
  }

   //Mostrar os detalhes de um tutorial no Modal
   async function handleModal() {
    const selectedTutorial = tutorials[0];
    router.push({
      pathname: '/new',
      query: {
        name: selectedTutorial.name,
        content: selectedTutorial.content,
        creator: selectedTutorial.creator,
        id: selectedTutorial.id,
      },      
    });
  }
    //Vindo do react-modal
    Modal.setAppElement('#__next')


  return(
   <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customStyles}
   >

    <button
    type="button"
    onClick={onRequestClose}
    className="react-modal-close"
    style={{ background: 'transparent', border:0 }}
    >
      <FiX size={45} color="#f34748" />
    </button>

    <div className={styles.container}>

      <h2>Detalhes do Tutorial</h2><br/>
      <span className={styles.table}>
        <strong>{tutorials[0].name}</strong><br/>
      </span><br/><br/>
      <span>
        Conteúdo: {tutorials[0].content}
      </span><br/><br/>
      <span>
        Criador: {tutorials[0].creator}
      </span><br/><br/>

     

    
      <button className={styles.buttonOrder} onClick={ () => handleModal() }>
        Editar Tutorial
      </button>

      <button className={styles.buttonOrder} onClick={ () => handleFinishTutorial(tutorials[0].id) }>
        Remover Tutorial
      </button>

    


    </div>
   

   </Modal>
  )
}