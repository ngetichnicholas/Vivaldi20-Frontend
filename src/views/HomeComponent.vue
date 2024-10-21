<template>
  <div class="container mt-5">
    <h1 class="mb-4">Welcome to Vivaldi20</h1>
    <p v-if="!members.length" class="text-center">Loading members...</p>
    <div v-else>
      <div class="row">
        <div class="col-md-4" v-for="member in members" :key="member.id">
          <div class="card mb-3 shadow-sm">
            <img :src="member.profile_photo || defaultProfileImage" class="card-img-top" alt="Profile Photo" />
            <div class="card-body">
              <h5 class="card-title">{{ member.first_name }} {{ member.last_name }}</h5>
              <p class="card-text">
                <strong>Profession:</strong> {{ member.profession }}<br />
                <strong>Username:</strong> {{ member.username }}<br />
                <strong>Bio:</strong> {{ member.bio || 'No bio available' }}
              </p>
              <!-- Edit Button -->
              <button class="btn btn-primary btn-sm" @click="openEditModal(member)">Edit</button>
              <!-- Delete Button -->
              <button class="btn btn-danger btn-sm" @click="confirmDelete(member.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Edit Member</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateMember">
                <div class="form-group">
                  <label for="first_name">First Name</label>
                  <input v-model="editMember.first_name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="last_name">Last Name</label>
                  <input v-model="editMember.last_name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="profession">Profession</label>
                  <input v-model="editMember.profession" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="bio">Bio</label>
                  <textarea v-model="editMember.bio" class="form-control" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-3">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import axios from 'axios';

export default {
  data() {
    return {
      members: [],
      defaultProfileImage: 'https://via.placeholder.com/150', // Placeholder image
      editMember: { first_name: '', last_name: '', profession: '', bio: '' }, // Default structure
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    
    // Redirect to login page if not authenticated
    if (!token) {
      this.$router.push('/login');
    } else {
      // Fetch members list if authenticated
      await this.fetchMembers();
    }
  },
  methods: {
    async fetchMembers() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/members/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.members = response.data.data.members;
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    },
    // Open Edit Modal
    openEditModal(member) {
      this.editMember = { ...member }; // Clone the member's details
      const modal = new Modal(document.getElementById('editModal'));
      modal.show(); // Show modal
    },
    // Update Member
    async updateMember() {
      const token = localStorage.getItem('token');
      try {
        await axios.put(`${process.env.VUE_APP_API_URL}/members/${this.editMember.id}/`, this.editMember, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.fetchMembers(); // Refresh members list
        alert('Member updated successfully');
        const modal = Modal.getInstance(document.getElementById('editModal'));
        modal.hide(); // Close modal after success
      } catch (error) {
        console.error('Error updating member:', error);
      }
    },
    // Confirm and delete member
    confirmDelete(memberId) {
      if (confirm('Are you sure you want to delete this member?')) {
        this.deleteMember(memberId);
      }
    },
    // Delete Member
    async deleteMember(memberId) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`${process.env.VUE_APP_API_URL}/members/${memberId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.fetchMembers(); // Refresh members list after deletion
        alert('Member deleted successfully');
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 100%;
  border-radius: 10px;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.card-body {
  text-align: center;
}

h1 {
  text-align: center;
}

button {
  margin-right: 10px;
}
</style>
