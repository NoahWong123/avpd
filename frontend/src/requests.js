import axios from "axios";
import {authenticateRequest, serverUrl} from "./utils";

export async function getUserData(token) {
  let requestConfig = {}

  requestConfig = await authenticateRequest(requestConfig, token)

  return axios.get(`${serverUrl()}/user`, requestConfig)
}

export async function getClassrooms(token) {
  let requestConfig = {}

  requestConfig = await authenticateRequest(requestConfig, token)

  return axios.get(`${serverUrl()}/instructor/classrooms`, requestConfig)
}

export async function createClassroom(token) {
  let requestConfig = {}

  requestConfig = await authenticateRequest(requestConfig, token)

  return axios.post(`${serverUrl()}/instructor/classrooms`, requestConfig)
}

export async function deleteClassroom(classroomID, token) {
  let requestConfig = {}

  requestConfig = await authenticateRequest(requestConfig, token)

  return axios.delete(`${serverUrl()}/instructor/classrooms/${classroomID}`, requestConfig)
}