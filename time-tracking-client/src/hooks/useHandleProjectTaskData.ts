import { APIEndpoints } from 'constant'
import { useState } from 'react'
import { GET } from 'services/httpService'

const useHandleProjectTaskData = () => {
  const [allProjects, setAllProjects] = useState<Array<any>>([])
  const [allTaskByProjectId, setAllTaskByProjectId] = useState<any>([])
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedTask, setSelectedTask] = useState('')
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState('')
  const [selectedProjectForEdit, setSelectedProjectForEdit] = useState('')
  const [allTaskForEdit, setAllTaskForEdit] = useState([])

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
      const response = await GET({ subUrl: APIEndpoints.task.getTaskById(id) })
      setAllTaskByProjectId(response?.data?.data || [])
      setSelectedProject(id)
    } catch (error) {
      return error
    }
  }

  const fetchAllTaskForEdit = async (id: string) => {
    try {
      const response = await GET({ subUrl: APIEndpoints.task.getTaskById(id) })
      setAllTaskForEdit(response?.data?.data || [])
      setSelectedProjectForEdit(id)
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
    setSelectedTaskForEdit,
    selectedTaskForEdit,
    selectedProjectForEdit,
    allTaskForEdit,
    fetchAllTaskForEdit,
    setSelectedProjectForEdit,
  }
}

export default useHandleProjectTaskData
