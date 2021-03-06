import React, { useRef, useCallback } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { FormHandles, SubmitHandler } from "@unform/core";

import Modal from "../Modal";
import Input from "../Input";

import { Form } from "./styles";

import { Foods } from "../../pages/Dashboard";

interface EditFood {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: Omit<Foods, "id" | "available">) => void;
  editingFood: EditFood;
}

const ModalEditFood: React.FC<ModalEditFoodProps> = ({
  isOpen,
  editingFood,
  setIsOpen,
  handleUpdateFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler = async (data: EditFood) => {
    handleUpdateFood(data);
    setIsOpen();
  };


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={editingFood}
      >
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
