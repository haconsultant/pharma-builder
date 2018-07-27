SELECT 
  A.Descripcion AS product_name, 
  B.Existencia AS quantity, ISNULL(CA.Descripcion,'n/a') AS 'uses',
  CONVERT (VARCHAR(50),A.M_CostoUnitario, 128) AS price,
  D.CodigoBarra AS product_barcode, ISNULL(EA.Nombre, 'n/a') AS component,
  F.Descripcion AS category, 
  G.Nombre AS brand
  FROM InvArticulo A
  LEFT JOIN InvLoteAlmacen B
      ON A.Id = B.InvArticuloId
  LEFT JOIN InvArticuloUso C
      ON A.Id = C.InvArticuloId
  LEFT JOIN InvUso CA
      ON C.InvUsoId = CA.Id
  LEFT JOIN InvCodigoBarra D
      ON D.InvArticuloId = A.Id
  LEFT JOIN InvArticuloComponente E
      ON E.InvArticuloId = A.Id
  LEFT JOIN InvComponente EA
      ON EA.Id = E.InvComponenteId
  LEFT JOIN InvCategoria F
      ON F.Id = A.InvCategoriaId
  LEFT JOIN InvMarca G
      ON G.Id = A.InvMarcaId
  WHERE B.Existencia > 0 AND D.CodigoBarra IS NOT NULL
  GROUP BY  A.Descripcion,A.M_CostoUnitario,CA.Descripcion,CA.Nota,D.CodigoBarra,EA.Nombre,F.Descripcion,G.Nombre
  ORDER BY  A.Descripcion`