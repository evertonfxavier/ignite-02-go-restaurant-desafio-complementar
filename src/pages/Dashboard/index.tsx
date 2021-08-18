import { useState, useEffect } from "react";

import Header from "../../components/Header";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";

import api from "../../services/api";

import { FoodsContainer } from "./styles";

export interface Foods {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

type FoodInput = Omit<Foods, "id" | "available">;

const Dashboard = () => {
  const [foods, setFoods] = useState<Foods[]>([]);
  const [editingFood, setEditingFood] = useState<Foods>({} as Foods);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get("/foods");
      setFoods(response.data);
    }

    loadFoods();
  }, []);

  async function handleAddFood(food: FoodInput) {
    try {
      const response = await api.post("/foods", { ...food, available: true });

      setFoods([...foods, response.data]);
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodInput) {
    const response = await api.put(`/foods/${editingFood.id}`, {
      ...food,
      available: editingFood.available,
    });
    const newFoods = [...foods];
    const findIndex = newFoods.findIndex(
      (findFood) => findFood.id === editingFood.id
    );

    newFoods[findIndex] = response.data;

    setFoods(newFoods);
    toggleEditModal();
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);
    setFoods(foods.filter((food) => food.id !== id));
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: Foods) {
    toggleEditModal();
    setEditingFood(food);
  }

  return (
    <>
      <Header openModal={toggleModal} />

      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods.map((food) => (
          <Food
            key={food.id}
            food={food}
            handleDelete={handleDeleteFood}
            handleEditFood={handleEditFood}
          />
        ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
