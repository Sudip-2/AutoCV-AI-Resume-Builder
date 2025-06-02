import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fileReplacer (key:any,value:any){
  return value instanceof File?{
    name:value.name,
    size:value.size,
    type:value.type,
    lastModified:value.lastModified
  }:value
}