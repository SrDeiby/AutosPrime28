# AutosPrime28

Venta pequeña de autos usados en Costa Rica. El sitio presenta su inventario y lleva al cliente a contactarlos por WhatsApp o llamada.

## Language

**Auto**:
Un vehículo físico y único del inventario (usado o seminuevo). No es un modelo genérico: tiene su propio año, kilometraje y fotos.
_Avoid_: modelo, publicación, anuncio

**Inventario**:
El conjunto de **Autos** que la venta muestra, sin importar su **Estado**.

**Estado**:
Situación comercial de un **Auto**: `disponible`, `reservado` o `vendido`. Los vendidos se siguen mostrando como prueba de confianza.

**Precio**:
Monto en colones (₡) que pide la venta por un **Auto**. Puede marcarse como negociable. No incluye cuotas de financiamiento.

**Equipamiento**:
Lista de características concretas que trae un **Auto** (sunroof, cámara de reversa, frenos ABS…). Se muestra con ✅.

**Lemas**:
Tres o cuatro adjetivos cortos que resumen un **Auto** ("Moderno • Económico • Cómodo"). Son de venta, no técnicos.

**Procedencia**:
Si un **Auto** es `nacional` (vendido nuevo en Costa Rica) o `importado` (usado traído del extranjero).

**Destacado**:
Un **Auto** disponible que la venta quiere mostrar de primero en el home.

**Financiamiento**:
Opción de pagar un **Auto** a plazos mediante una financiera. Es una oferta general de la venta, no un dato de cada **Auto**.

**Parte de pago**:
Cuando la venta recibe el vehículo del cliente como abono al **Precio** de un **Auto**.

**Prueba de manejo**:
Cita que el cliente agenda (por WhatsApp o llamada) para manejar un **Auto** específico antes de comprarlo.

## Relationships

- El **Inventario** contiene muchos **Autos**
- Cada **Auto** tiene exactamente un **Estado**, un **Precio** y una lista de **Equipamiento**
- **Financiamiento** y **Parte de pago** aplican a cualquier **Auto** disponible

## Flagged ambiguities

- En sus publicaciones aparece "sensores según versión": eso describe un modelo, no un **Auto**. En el sitio, el **Equipamiento** debe decir lo que ese auto trae de verdad.
