<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { isNavigationFailure, useRouter } from 'vue-router';

const router = useRouter()

if (!AuthService.hasAuth()) {
  router.push('/user/login')
}

const name = ref<string>('')
const location = ref<string>('')
const description = ref<string>('')
const email = AuthService.getEmail()
const logout = useLogout()



function create(e: Event) {
    e.preventDefault()

    if(name.value == '' || location.value == '') return
    
    MainService.createNewSpot(location.value, name.value, description.value, email)
        .then(rsp => {
            router.push('/')
        })
        .then((failure) => {
        if (isNavigationFailure(failure)) {
            console.warn('Navigation failed:', failure)
        } else {
            console.log('Navigated to /')
        }
        })
        .catch(e => alert('Something went wrong...'))


}

</script>

<template>
    <Navigation />
    <div class="card-body">
        <div class="text-center">
            <h2>Create a new spot</h2>
            <p>SASE project?</p>
        </div>
        <form @submit.prevent="e => create(e)">
            <div class="mb-3">
                <label for="name" class="form-label">SPot name</label>
                <input type="name" class="form-control" id="name" v-model="name">
            </div>
            <div class="mb-3">
                <label for="location" class="form-label">WHere is it?</label>
                <input type="location" class="form-control" id="location" v-model="location">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Add description</label>
                <input type="description" class="form-control" id="description" v-model="description">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>