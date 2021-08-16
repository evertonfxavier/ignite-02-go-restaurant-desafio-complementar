import { Component, useState, useEffect } from "react";

import Header from "../../components/Header";
import api from "../../services/api";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
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
    api.get("/foods").then((response) => setFoods(response.data));
  }, []);

  console.log(foods);

  // handleAddFood = async food => {
  //   const { foods } = this.state;

  //   try {
  //     const response = await api.post('/foods', {
  //       ...food,
  //       available: true,
  //     });

  //     this.setState({ foods: [...foods, response.data] });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function handleAddFood(food: FoodInput) {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      // const { food } = response.data;

      // setFood(()=> '');
    } catch (err) {
      console.log(err);
    }
  }

  // handleUpdateFood = async food => {
  //   const { foods, editingFood } = this.state;

  //   try {
  //     const foodUpdated = await api.put(
  //       `/foods/${editingFood.id}`,
  //       { ...editingFood, ...food },
  //     );

  //     const foodsUpdated = foods.map(f =>
  //       f.id !== foodUpdated.data.id ? f : foodUpdated.data,
  //     );

  //     this.setState({ foods: foodsUpdated });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function handleUpdateFood(food: FoodInput) {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      // const foodsUpdated = foods.map((f) =>
      //   f.id !== foodUpdated.data.id ? f : foodUpdated.data
      // );

      // this.setState({ foods: foodsUpdated });
    } catch (err) {
      console.log(err);
    }
  }

  // handleDeleteFood = async id => {
  //   const { foods } = this.state;

  //   await api.delete(`/foods/${id}`);

  //   const foodsFiltered = foods.filter(food => food.id !== id);

  //   this.setState({ foods: foodsFiltered });
  // }

  async function handleDeleteFood(id: any) {
    //   const { foods } = this.state;
    //   await api.delete(`/foods/${id}`);
    //   const foodsFiltered = foods.filter(food => food.id !== id);
    //   this.setState({ foods: foodsFiltered });
  }

  // toggleModal = () => {
  //   const { modalOpen } = this.state;

  //   this.setState({ modalOpen: !modalOpen });
  // }

  function toggleModal() {
    setModalOpen(true);
  }

  // toggleEditModal = () => {
  //   const { editModalOpen } = this.state;

  //   this.setState({ editModalOpen: !editModalOpen });
  // }

  function toggleEditModal() {
    setEditModalOpen(true);
  }

  // handleEditFood = food => {
  //   this.setState({ editingFood: food, editModalOpen: true });
  // }

  function handleEditFood() {
    //setEditingFood ?
  }

  return (
    <>
      <Header />
      {/* <Header openModal={toggleModal} /> */}

      {/* 
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={this.toggleModal}
        handleAddFood={this.handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={this.toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={this.handleUpdateFood}
      /> */}

      <FoodsContainer data-testid="foods-list">
        <Food
          food={foods}
          // handleDelete={this.handleDeleteFood}
          // handleEditFood={this.handleEditFood}
        />
      </FoodsContainer>
    </>
  );
};

export default Dashboard;