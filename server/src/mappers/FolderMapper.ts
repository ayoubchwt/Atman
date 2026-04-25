import { createFolderDto, FolderResponseDto } from "../dtos/FolderDTOs";
import { NoteResponseDto } from "../dtos/NoteDTO";
import Folder, { IFolder } from "../models/Folder";

export class FolderMapper {
  public static toResponseDto(folder: IFolder): FolderResponseDto {
    return {
      id: folder._id.toString(),
      label: folder.label,
    };
  }
  public static toListResponseDto(folders: IFolder[]): FolderResponseDto[] {
    return folders.map((folder) => this.toResponseDto(folder));
  }
  public static toEntity(userId: string, dto: createFolderDto): IFolder {
    return new Folder({
      label: dto.label,
      user: userId,
    });
  }
}
