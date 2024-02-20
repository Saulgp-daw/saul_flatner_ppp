package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;


@Service
public class FileStorageService {
	private final Path root = Paths.get("uploads");

	private Path getFilenameFree(String filename) {
		Path pathCompleto = this.root.resolve(filename);
		String nombre = "";
		String extension = "";
		if (filename.contains(".")) {
			extension = filename.substring(filename.lastIndexOf(".") + 1);
			nombre = filename.substring(0, filename.length() - extension.length() - 1);

		} else {
			nombre = filename;
		}
		int contador = 1;
		while (Files.exists(pathCompleto)) {
			String nuevoNombre = nombre + "_" + contador;
			nuevoNombre += "." + extension;
			pathCompleto = this.root.resolve(nuevoNombre);
			contador++;
		}
		return (pathCompleto);
	}

	public String savePerfil(String usuario, String antiguoPerfil, String nuevoPerfil, byte[] dataFile) {
		// creamos el directorio si no existe
		Path carpetaPerfiles = null;
		try {
			carpetaPerfiles = Paths.get(this.root+"/perfiles/"+usuario);
			Files.createDirectories(carpetaPerfiles);
		} catch (IOException e) {
			throw new RuntimeException("no se puede crear el directorio");
		}
		
		//reemplazar la antigua imagen en caso de poner un perfil nuevo
//		if(antiguoPerfil != null && !antiguoPerfil.isEmpty()) {
//			try {
//		        Path rutaAntigua = Paths.get(this.root + "/perfiles/"+usuario+"/" +antiguoPerfil);
//		        Files.deleteIfExists(rutaAntigua);
//		    } catch (IOException e) {
//		        throw new RuntimeException("Error al borrar la imagen de perfil anterior: " + e.getMessage());
//		    }
//		}

		try {
			Path filenameFree = getFilenameFree("perfiles/"+usuario+"/"+nuevoPerfil);
			Files.write(filenameFree, dataFile);
			return filenameFree.getFileName().toString();
		} catch (Exception e) {
			if (e instanceof FileAlreadyExistsException) {
				throw new RuntimeException("A file of that name already exists.");

			}

			throw new RuntimeException(e.getMessage());
		}

	}
	
	
	public String saveImagenPiso(String usuario, String foto, byte[] dataFile) {
		// creamos el directorio si no existe
		Path carpetaPerfiles = null;
		try {
			carpetaPerfiles = Paths.get(this.root+"/perfiles/"+usuario);
			Files.createDirectories(carpetaPerfiles);
		} catch (IOException e) {
			throw new RuntimeException("no se puede crear el directorio");
		}
		
		

		try {
			Path filenameFree = getFilenameFree("perfiles/"+usuario+"/"+foto);
			Files.write(filenameFree, dataFile);
			return filenameFree.getFileName().toString();
		} catch (Exception e) {
			if (e instanceof FileAlreadyExistsException) {
				throw new RuntimeException("A file of that name already exists.");

			}

			throw new RuntimeException(e.getMessage());
		}

	}

	public String save(MultipartFile file) {
		// creamos el directorio si no existe
		try {
			Files.createDirectories(root);
		} catch (IOException e) {
			throw new RuntimeException("no se puede crear el directorio");
		}
		try {
			Path filenameFree = getFilenameFree(file.getOriginalFilename());
			Files.copy(file.getInputStream(), filenameFree);
			return filenameFree.getFileName().toString();
		} catch (Exception e) {
			if (e instanceof FileAlreadyExistsException) {
				throw new RuntimeException("ya existe un fichero llamado así");

			}

			throw new RuntimeException(e.getMessage());

		}

	}

	public Resource getPerfil(String usuario, String filename) {
		try {
			// obtenemos la ruta al fichero en nuestra carpeta, dado el nombre como
			// parámetro
			
			Path pathForFilename = root.resolve("perfiles/"+usuario+"/"+filename);

			// queremos devolver un recurso fichero. Obtenemos un recurso para el path del
			// fichero deseado
			Resource resource = new UrlResource(pathForFilename.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new RuntimeException("no se puede acceder a " + filename);
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("Error: " + e.getMessage());
		}
	}

}
