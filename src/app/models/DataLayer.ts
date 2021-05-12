





export class User {
    
    public usrId: number = 0;
    public usrName: string = "";
    public usrLogin: string = "";
    public usrPassword: string = "";
    public usrEmail: string = "";
    public usrAddress: string = "";
    public usrTelephone: string = "";
    public usrFax: string = "";
    public distriId: number | null = null;
}

export class UserKey {
    
    public usrId: number = 0;
}

export class Role {
    
    public rolId: number = 0;
    public rolDescription: string = "";
}

export class RoleKey {
    
    public rolId: number = 0;
}

export class UserRole {
    
    public usrRolId: number = 0;
    public usrId: number | null = null;
    public rolId: number | null = null;
}

export class UserRoleKey {
    
    public usrRolId: number = 0;
}

export class Maintenance {
    
    public mantenimientoId: number = 0;
    public numeroMantenimiento: string = "";
    public numeroMantenimientoNoenac: string = "";
    public numeroMantenimientoPr: string = "";
    public usrId: number | null = null;
    public distriId: number | null = null;
    public mantenimientoEstadoId: number | null = null;
    public equipoId: number | null = null;
    public tecnicoId: number | null = null;
    public isoId: number | null = null;
    public peticionarioId: number | null = null;
    public mantenimientoEnac: number | null = null;
    public mantenimientoNtPr: number | null = null;
    public medidorParticulasId: number | null = null;
    public medidorVelocidadId: number | null = null;
    public medidorPresionId: number | null = null;
    public medidorEstaqueId: number | null = null;
    public medidorTemperaturaId: number | null = null;
    public medidorHumedadId: number | null = null;
    public estanqueIncertidumbre: number | null = null;
    public medicionTemperatura: number | null = null;
    public medicionHumedad: number | null = null;
    public funcionaVelocidad1: number | null = null;
    public causa1: string = "";
    public funcionaVelocidad2: number | null = null;
    public causa2: string = "";
    public creationdate: Date | null = null;
    public modificationdate: Date | null = null;
    public comentarios: string = "";
    public fechaEnsayo: Date | null = null;
    public fechaProximoEnsayo: Date | null = null;
    public laboratorio: string = "";
    public annoConstruccion: number | null = null;
    public sala: string = "";
    public numIdentificacion: string = "";
    public calibracionIdPresion: number | null = null;
    public calibracionIdVelocidad: number | null = null;
    public calibracionIdRecirculacion: number | null = null;
    public calibracionIdCaudal: number | null = null;
    public ensayoParticulas: number | null = null;
    public ensayoLaminaridad: number | null = null;
    public ensayoBarreras: number | null = null;
    public ensayoBarrerasaus: number | null = null;
    public ensayoRecirculacion: number | null = null;
    public ensayoCaudal: number | null = null;
    public ensayoPresion: number | null = null;
    public ensayoEstanqueidad: number | null = null;
    public resumenEstado: number | null = null;
    public condicionFuncionamientoId: number | null = null;
    public controlCalidadId: number | null = null;
    public codigoSap: number | null = null;
}

export class MaintenanceKey {
    
    public mantenimientoId: number = 0;
}

export class MaintenanceStates {
    
    public mantenimientoEstadoId: number = 0;
    public descripcion: string = "";
}

export class MaintenanceStatesKey {
    
    public mantenimientoEstadoId: number = 0;
}

