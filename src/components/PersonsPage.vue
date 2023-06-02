<template>
  <div>
    <table v-if="items.length > 0" class="table table-striped table-bordered">
      <thead>
        <tr class="table-primary">
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.position }}</td>
          <td>
            <button class="btn btn-primary" @click="openEditForm(item)">Edit</button>
            <button class="btn btn-danger" @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No items available</p>
    <button class="btn btn-success" @click="showForm = true">New Person</button>
    <form class="form-group" v-if="showForm" @submit.prevent="addItem">
      <label for="name">Name:</label>
      <input class="form-control" type="text" id="name" v-model="newItem.name" required>
      <label for="address">Address:</label>
      <input class="form-control" type="text" id="address" v-model="newItem.address" required>
      <label for="position">Position:</label>
      <input class="form-control" type="text" id="position" v-model="newItem.position" required>
      <button class="btn btn-primary" type="submit"  :disabled="isFormInvalid">Save</button>
      <button class="btn btn-secondary" @click="showForm = false">Cancel</button>
    </form>
    <form class="form-group" v-if="showFormEdit" @submit.prevent="editItem">
      <label for="name">Name:</label>
      <input class="form-control" type="text" id="name" v-model="editedItem.name" required>
      <label for="address">Address:</label>
      <input class="form-control" type="text" id="address" v-model="editedItem.address" required>
      <label for="position">Position:</label>
      <input class="form-control" type="text" id="position" v-model="editedItem.position" required>
      <button class="btn btn-primary" type="submit"  :disabled="isFormEditInvalid">Edit</button>
      <button class="btn btn-secondary" @click="showFormEdit = false">Cancel</button>
    </form>
  </div>
</template>


<script>
import PersonService from '@/services/PersonService';
import { ref } from 'vue';

export default {
  name: 'PersonsPage',
  props: {
    msg: String
  },
  data () {
    return {
      
        headers: [
             'Name',
             'Address',
              'Position',
             'Action'
        ],
        items: ref([]),
        newItem: {},
        showForm: false,
        showFormEdit: false,
        dialog: false,
        itemsSelected: ref([]),
        editedItem: {}
    }
  },
  mounted() {
    this.loadItems();
  },
  computed: {
    isFormInvalid() {
      return (
        !this.newItem.name ||
        !this.newItem.address ||
        !this.newItem.position ||
        this.newItem.name.trim() === '' ||
        this.newItem.address.trim() === '' ||
        this.newItem.position.trim() === ''
      );
    },
    isFormEditInvalid() {
      return (
        !this.editedItem.name ||
        !this.editedItem.address ||
        !this.editedItem.position ||
        this.editedItem.name.trim() === '' ||
        this.editedItem.address.trim() === '' ||
        this.editedItem.position.trim() === ''
      );
    }
  },
  methods: {

    openEditForm(item) {
        this.editedItem = item;
        this.showFormEdit = true;
    },
    loadItems() {
        PersonService.list().then((result) => {
            if( result.status !== 200 ){
              this.$toast.error(result.data.message);
            }
            this.items = result.data.data;
        }).catch((error) => {
            this.$toast.error('Ocorreu um erro ao realizar a operação.');
            console.log(error);
        })
    },
    editItem(){

      if(this.isFormEditInvalid){
        return;
      }

      let data = JSON.stringify(this.editedItem);
        PersonService.updateItem(data).then((result) => {
          console.log(result);
          if (result.status === 200) {
            this.loadItems();
            this.showFormEdit= false;
            this.editedItem = {};
            this.$toast.success(result.data.message);
          } else{
            this.$toast.error(result.data.message);
          }
        }).catch((error) => {
            console.log(error);
        });
    },
    addItem(){

      if(this.isFormInvalid){
        return;
      }

      this.newItem.id = null;
      let data = JSON.stringify(this.newItem);
        PersonService.addItem(data).then((result) => {
          console.log(result);
          if (result.status === 200) {
            this.loadItems();
            this.showForm= false;
            this.newItem = {};
            this.$toast.success(result.data.message);
          } else{
            this.$toast.error(result.data.message);
          }
        }).catch((error) => {
            console.log(error);
        });
    },
    deleteItem(id){
      PersonService.remove(id).then((result) => {
        console.log(result);
          if (result.status === 200) {
            this.$toast.success(result.data.message);
            this.loadItems();
          } else{
            this.$toast.error(result.data.message);
          }
        }).catch((error) => {
            console.log(error);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
