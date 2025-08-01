<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()

function doLogin(e: Event) {
    e.preventDefault()

    if (email.value == '' || password.value == '') return

    MainService.login(email.value, password.value)
        .then(rsp => {
            AuthService.createAuth(rsp.data)
            router.push('/')
        })
        .catch(e => alert('Wrong username or password'))
}
</script>

<template>
    <Navigation />
    <div class="card-body">
        <div class="text-center">
            <h2>Write your email and password</h2>
            <p>SASE project?</p>
        </div>
        <form v-on:submit="e => doLogin(e)">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <RouterLink class="button" to="/user/register" style="margin-top: 10px;">
            <button type="button" class="btn btn-primary" style="margin-top: 10px;">Sign up</button>
        </RouterLink>
    </div>
</template>