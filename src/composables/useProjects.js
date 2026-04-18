import { ref } from 'vue'

const data = ref(null)
const loading = ref(false)

export function useProjects() {
    if (!data.value && !loading.value) {
        loading.value = true
        fetch('/projects.json')
            .then(r => r.json())
            .then(json => {
                data.value = Array.isArray(json) ? json : []
                loading.value = false
            })
    }

    return { projectData: data, loading }
}
