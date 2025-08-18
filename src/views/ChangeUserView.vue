<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const password = ref<string>('')
const name = ref<string>('')
const email = ref<string>('')
const router = useRouter()
const logout = useLogout()

email.value = AuthService.getAuth().email

function doChange(e: Event) {
    e.preventDefault()

    if (name.value == '' || password.value == '') return 
    
    
    MainService.deleteUser(email.value)
    setTimeout(() => {MainService.register(email.value, password.value, name.value)}, 200)
    
    logout(null)
    router.push('/user/login')

}

</script>


<template>
    <Navigation />


    <div class="card-body">
        <div class="text-center">
            <h2>Write your new password and preferred username</h2>
            <p>Sase project?</p>
        </div>
        <form v-on:submit="e => doChange(e)">
            <div class="mb-3">
                <label for="name" class="form-label">New username</label>
                <input type="name" class="form-control" id="name" v-model="name">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">New password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
</template>