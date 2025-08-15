<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { SpotModel } from '@/models/spot.model';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { SpotService } from '@/services/spot.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const logout = useLogout()
const spot = ref<SpotModel>()
const id = Number(route.params.id)

if (!AuthService.hasAuth()) {
  router.push('/user/login')
}

SpotService.getSpotByID(id)
    .then(rsp => spot.value = rsp.data)
    .catch(e => alert("couldn't find spot"))


const name = ref<string>(spot.value!.name)
const location = ref<string>(spot.value!.location)
const description = ref<string>(spot.value!.description)

function redact(e: Event) {
    e.preventDefault()


    if(name.value == '' || location.value == '') return

    MainService.redactSpot(name.value, location.value, description.value, id)

}


</script>

<template>
    <Navigation />
    <div class="card-body">
        <div class="text-center">
            <h2>Create a new spot</h2>
            <p>SASE project?</p>
        </div>
        <form @submit.prevent="e => redact(e)">
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