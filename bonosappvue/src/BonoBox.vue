<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col" class="d-none d-md-table-cell">Duración</th>
            <th scope="col" class="d-none d-md-table-cell">Descripción</th>
            <th scope="col">Inicio</th>
            <th scope="col">Fin</th>
            <th scope="col" class="d-none d-md-table-cell"></th>
            <th scope="col" class="d-none d-md-table-cell"></th>
            <th scope="col" class="d-md-none">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Ron_10</th>
          <td>70</td>
          <td class="d-none d-md-table-cell">2 meses</td>
          <td class="d-none d-md-table-cell">10 Consumiciones de Ron con refresco</td>
          <td>01/01/2025</td>
          <td>31/03/2030</td>
          <!-- Botones separados para pantallas grandes -->
          <td class="d-none d-md-table-cell">
            <button class="btn btn-primary btn-sm">Editar</button>
          </td>
          <td class="d-none d-md-table-cell">
            <button class="btn btn-danger btn-sm">Eliminar</button>
          </td>
          <!-- Menú desplegable para pantallas pequeñas -->
          <td class="d-md-none">
            <div class="btn-group">
              <button class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Acciones
              </button>
              <ul class="dropdown-menu">
                <li><button class="dropdown-item">Editar</button></li>
                <li><button class="dropdown-item">Eliminar</button></li>
              </ul>
            </div>
          </td>
        </tr>
        <!-- Repite para las demás filas -->
        <tr>
          <th scope="row">Gin_10</th>
          <td>75</td>
          <td class="d-none d-md-table-cell">2 meses</td>
          <td class="d-none d-md-table-cell">10 Consumiciones de Gin con refresco</td>
          <td>01/01/2025</td>
          <td>31/03/2030</td>
          <td class="d-none d-md-table-cell">
            <button class="btn btn-primary btn-sm">Editar</button>
          </td>
          <td class="d-none d-md-table-cell">
            <button class="btn btn-danger btn-sm">Eliminar</button>
          </td>
          <td class="d-md-none">
            <div class="btn-group">
              <button class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Acciones
              </button>
              <ul class="dropdown-menu">
                <li><button class="dropdown-item">Editar</button></li>
                <li><button class="dropdown-item">Eliminar</button></li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</template>