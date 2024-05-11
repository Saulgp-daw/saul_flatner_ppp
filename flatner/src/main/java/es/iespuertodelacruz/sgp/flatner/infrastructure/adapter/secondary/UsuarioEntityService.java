package es.iespuertodelacruz.sgp.flatner.infrastructure.adapter.secondary;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.iespuertodelacruz.sgp.flatner.domain.model.Usuario;
import es.iespuertodelacruz.sgp.flatner.domain.model.Watchlist;
import es.iespuertodelacruz.sgp.flatner.domain.port.secondary.IUsuarioDomainRepository;
import jakarta.transaction.Transactional;

@Service
public class UsuarioEntityService implements IUsuarioDomainRepository{
	
	@Autowired
	IUsuarioEntityRepository ueRepository;
	
	@Autowired
	IPisoEntityRepository peRepository;
	
	@Autowired
	IWatchlistEntityRepository weRepository;
	
	EntityMapper mapper = new EntityMapper();

	@Override
	public List<Usuario> findAll() {
		List<UsuarioEntity> lista = ueRepository.findAll();
		
		return lista.stream().map(ue -> mapper.toDomainUsuario(ue)).collect(Collectors.toList());
	}

	@Override
	public Usuario findById(String email) {
		Usuario usuario = null;
		if(email != null) {
			Optional<UsuarioEntity> opt = ueRepository.findById(email);
			if(opt.isPresent()) {
				
				UsuarioEntity usuarioEntity = opt.get();
				usuario = mapper.toDomainUsuario(usuarioEntity);
			}
			
		}
		return usuario;
	}

	@Override
	public Usuario save(Usuario domain) {
		if(domain != null) {
			UsuarioEntity ue = mapper.toEntityUsuario(domain, true);
			UsuarioEntity save = ueRepository.save(ue);
			if(save != null) {
				return mapper.toDomainUsuario(save);
			}
		}
		return null;
	}

	@Override
	@Transactional
	public Usuario update(Usuario domain) {
		Optional<UsuarioEntity> opt = ueRepository.findById(domain.getEmail());
		
		if(opt.isPresent()) {
			UsuarioEntity ue = mapper.toEntityUsuario(domain, true);
			
			PisoEntity pisoActual = mapper.toEntityPiso(domain.getPisoActual(), false);
			
			List<PisoEntity> propiedades = domain.getPropiedades().stream()
					.map(piso -> mapper.toEntityPiso(piso, false))
					.collect(Collectors.toList());
			
			List<WatchlistEntity> pisosInteres = domain.getPisosInteres().stream()
					.map(watchlist -> mapper.toEntityWatchlist(watchlist))
					.collect(Collectors.toList());
			
			ue.setNombre(domain.getNombre());
			ue.setApellidos(domain.getApellidos());
			ue.setEmail(domain.getEmail());
			ue.setActive(domain.isActive());
			ue.setVerified(domain.isVerified());
			ue.setAnhoNacimiento(domain.getAnhoNacimiento());
			ue.setFechaUltimaEstancia(domain.getFechaUltimaEstancia());
			ue.setFechaUltimoAlquiler(domain.getFechaUltimoAlquiler());
			ue.setFotoPerfil(domain.getFotoPerfil());
			ue.setPassword(domain.getPassword());
			ue.setHash(domain.getHash());
			ue.setRol(domain.getRol());
			ue.setSexo(domain.getSexo());
			ue.setValoracion(domain.getValoracion());
			ue.setPropiedades(propiedades);
			ue.setPisosInteres(pisosInteres);
			ue.setPisoActual(pisoActual);
			
			UsuarioEntity update = ueRepository.save(ue);
			return mapper.toDomainUsuario(update);
		}
		return null;
	}
	
	@Transactional
	public UsuarioEntity registro(UsuarioEntity entity) {
		return ueRepository.save(entity);
	}
	
	@Transactional
	@Override
	public boolean delete(String email) {
		boolean borrado = false;
		Optional<UsuarioEntity> opt = ueRepository.findById(email);
		if(opt.isPresent()) {
			UsuarioEntity usuarioEntity = opt.get();
			List<PisoEntity> propiedades = usuarioEntity.getPropiedades();
			List<WatchlistEntity> pisosInteres = usuarioEntity.getPisosInteres();
			
			//Aunque tenga many to many y no tenga borrado en cascada borra la tabla intermedia
			for(WatchlistEntity we : pisosInteres) {
				weRepository.deleteById(we.getIdWatchlist());
				
			}
			
			if(propiedades != null) {
				for(PisoEntity piso : propiedades) {
					if(piso.getPropietario().getEmail().equals(usuarioEntity.getEmail())) {
						peRepository.delete(piso);
					}
				}
				propiedades.clear();
			}
			
			
			ueRepository.delete(usuarioEntity);
			Optional<UsuarioEntity> usuarioBorrado = ueRepository.findById(email);
			if(usuarioBorrado.isEmpty()) {
				borrado = true;
			}
		}
		return borrado;
	}
	



}
