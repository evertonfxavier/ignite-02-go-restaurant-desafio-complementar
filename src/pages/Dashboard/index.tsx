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
    // api.get("/foods").then((response) => setFoods(response.data));
    // console.log(foods);

    async function loadFoods(): Promise<void> {
      // TODO LOAD FOODS
      const response = await api.get("/foods");
      setFoods(response.data);
    }

    loadFoods();
  }, []);

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
    // try {
    //   const response = await api.post("/foods", {
    //     ...food,
    //     available: true,
    //   });

    //   // const { food } = response.data;

    //   // setFood(()=> '');
    //   setFoods([...foods, response.data]);
    // } catch (err) {
    //   console.log(err);
    // }

    try {
      const response = await api.post("/foods", { ...food, available: true });

      setFoods([...foods, response.data]);
      toggleModal();
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
    // try {
    //   const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
    //     ...editingFood,
    //     ...food,
    //   });

    //   // const foodsUpdated = foods.map((f) =>
    //   //   f.id !== foodUpdated.data.id ? f : foodUpdated.data
    //   // );

    //   // this.setState({ foods: foodsUpdated });
    // } catch (err) {
    //   console.log(err);
    // }

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

  // handleDeleteFood = async id => {
  //   const { foods } = this.state;

  //   await api.delete(`/foods/${id}`);

  //   const foodsFiltered = foods.filter(food => food.id !== id);

  //   this.setState({ foods: foodsFiltered });
  // }

  async function handleDeleteFood(id: number) {
    //   const { foods } = this.state;
    //   await api.delete(`/foods/${id}`);
    //   const foodsFiltered = foods.filter(food => food.id !== id);
    //   this.setState({ foods: foodsFiltered });

    await api.delete(`/foods/${id}`);

    // let foodIndex = foods.findIndex(food => food.id ==id)
    // let newFoods  = foods.splice(foodIndex, 1)
    // setFoods(newFoods)
    setFoods(foods.filter((food) => food.id !== id));
  }

  // toggleModal = () => {
  //   const { modalOpen } = this.state;

  //   this.setState({ modalOpen: !modalOpen });
  // }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  // toggleEditModal = () => {
  //   const { editModalOpen } = this.state;

  //   this.setState({ editModalOpen: !editModalOpen });
  // }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  // handleEditFood = food => {
  //   this.setState({ editingFood: food, editModalOpen: true });
  // }

  function handleEditFood(food: Foods) {
    //setEditingFood ?

    toggleEditModal();
    setEditingFood(food);
  }

  return (
    <>
      {/* <Header /> */}
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
