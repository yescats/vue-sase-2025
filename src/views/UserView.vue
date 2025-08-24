<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import { useLogout } from '@/hooks/logout.hook';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()


if (!AuthService.hasAuth()) {
  router.push('/user/login')
}

const logout = useLogout()
const showConfirm = ref(false)

function deleteMsg() {
    showConfirm.value = true
}

function cancelDelete() {
    showConfirm.value = false
}

function doDelete() {
    MainService.deleteUser(AuthService.getAuth().email)
    router.push('/user/login')
}
function goToSpotCreate() {
    router.push('/spot/createspot')
}
function goToUserRedact() {
    router.push('/user/redact')
}

</script>

<template>
    <Navigation />
    I don't know what here will be yet but sit tight ok?
<div>

</div>


    <button class="btn btn-primary btn-block" @click="goToSpotCreate()">Create new spot?</button>


    <button id="delete" class="btn btn-primary btn-block" @click="deleteMsg()">Delete Account?</button>

    <button class="btn btn-primary btn-block" @click="goToUserRedact()">Change user information</button>

    <div v-if="showConfirm">
        <p>Are you sure you want to delete your account?</p>
        <button id="confirmDelete" type="button" class="btn btn-primary" @click="doDelete()">Yes, Delete</button>
        <button id="cancelDelete" type="button" class="btn btn-primary" @click="cancelDelete()">Cancel</button>

    </div>


</template>