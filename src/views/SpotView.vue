<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { SpotModel } from '@/models/spot.model';
import { AuthService } from '@/services/auth.service';
import { SpotService } from '@/services/spot.service';
import { formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter()
const route = useRoute()
const logout = useLogout()
const id = Number(route.params.id)
const spot = ref<SpotModel>()


if (!AuthService.hasAuth()) {
  router.push('/user/login')
}


function checkId(spot: any, user: number) {
    console.log("Is this working?")
    console.log(spot)
    console.log(user)
    return spot == user || user == 3
}

function changeSpot() {
    console.log(`/spot/${id}/change`)
    router.push(`/spot/${id}/change`)
}

SpotService.getSpotByID(id)
    .then(rsp => spot.value = rsp.data)
    .catch(e => logout(e))
</script>

<template>
    <Navigation />
    <div v-if="spot">
        <div class="row mb-3">
            <div class="col-6">
                <div class="card-header">
                    <h3>{{ spot.name }}</h3>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        Added by: {{ spot.addedBy }}
                    </li>
                    <li class="list-group-item">
                        Added on: {{ formatTime(spot.createdAt) }}
                    </li>
                    <li class="list-group-item">
                        Located at {{ spot.location }}
                    </li>
                    <li class="list-group-item">
                        {{ spot.description ?? "No description was added"}}
                    </li>
                    <li class="list-group-item" v-if="checkId(spot.addedBy, AuthService.getUserId())">
                        <button class="btn btn-primary" @click="changeSpot">
                            Change Spot?
                        </button>
                    </li>
                    <li class="list-group-item" v-else>
                        <button class="btn btn-primary disabled">
                            You can't change this spot
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>