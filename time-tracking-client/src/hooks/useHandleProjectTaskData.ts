import { APIEndpoints } from 'constant'
import { useState } from 'react'
import { GET } from 'services/httpService'

const useHandleProjectTaskData = () => {
  const [allProjects, setAllProjects] = useState([])
  const [allTaskByProjectId, setAllTaskByProjectId] = useState([])
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedTask, setSelectedTask] = useState('')

  const fetchAllProjects = async () => {
    try {
      const response = await GET({ subUrl: APIEndpoints.task.getProjects })
      setAllProjects(response?.data?.data || [])
    } catch (error) {
      return error
    }
  }

  const fetchAllTask = async (id: string) => {
    try {
      const response = await GET({ subUrl: `${APIEndpoints.task.getTaskById}/${id}` })
      setAllTaskByProjectId(response?.data?.data || [])
      setSelectedProject(id)
    } catch (error) {
      return error
    }
  }

  return {
    fetchAllProjects,
    fetchAllTask,
    allProjects,
    allTaskByProjectId,
    setSelectedProject,
    setSelectedTask,
    selectedProject,
    selectedTask,
  }
}

export default useHandleProjectTaskData
