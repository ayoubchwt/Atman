import { createFolderDto, FolderResponseDto } from "../dtos/FolderDTOs";
import { FolderMapper } from "../mappers/FolderMapper";
import Folder, { IFolder } from "../models/Folder";
export class FolderService {
  public static async createFolder(
    userId: string,
    dto: createFolderDto,
  ): Promise<FolderResponseDto> {
    const folder: IFolder = FolderMapper.toEntity(userId, dto);
    const savedFolder = await folder.save();
    return FolderMapper.toResponseDto(savedFolder);
  }
  public static async getFolders(userId: string): Promise<FolderResponseDto[]> {
    const folders: IFolder[] = await Folder.find({ user: userId });
    return FolderMapper.toListResponseDto(folders);
  }
}
