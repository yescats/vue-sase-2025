<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const email = ref<string>('')
const password = ref<string>('')
const name = ref<string>('')
const router = useRouter()


function doRegister(e: Event) {
    e.preventDefault()

    if(email.value == '' || password.value == '' || name.value == '') return

    MainService.register(email.value, password.value, name.value)
        .then(rsp => {
            AuthService.createAuth(rsp.data)
            router.push('/')
        })
        .catch(e => alert('Something went wrong...'))
}
</script>

<template>
    <Navigation />
    <div class="card-body">
        <div class="text-center">
            <h2>Write your email, password and preferred username</h2>
            <p>Sase project?</p>
        </div>
        <form v-on:submit="e => doRegister(e)">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Username</label>
                <input type="name" class="form-control" id="name" v-model="name">
            </div>
            <button type="submit" class="btn btn-primary">Sign in</button>
        </form>
    </div>
    
</template>