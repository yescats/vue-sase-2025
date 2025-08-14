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
                        {{ spot.description }}
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>

</template>