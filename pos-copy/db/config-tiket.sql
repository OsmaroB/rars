USE [pos-pwa-db]
GO
SET IDENTITY_INSERT [dbo].[tiketConfigurations] ON 

INSERT [dbo].[tiketConfigurations] ([id], [enterprise], [nit], [item], [address], [resolution], [serie], [authorizationDate], [cashRegisterNumber], [link], [paragraph1], [paragraph2], [userCreate], [userUpdate], [createdAt], [updatedAt]) VALUES (3, N'SW INVERSIONES INTERNACIONALES DE ALIMENTOS, S.A. DE C.V', N'0614-130910-105-1', N'Comida Rápida', N'CARR. TRONCAL DEL NORTE , Local. L-4 , CTRO. COM. AGUILARES , AGUILARES, SAN SALVADOR', N'ASC-15041-048524-2023', N'23DS05900050|', N'06/02/2023', N'50', N'www.subway.com', N'Ingresa al siguiente enlace para mayor información', N'', 1, 1, CAST(N'2023-01-18T18:57:26.0290000+00:00' AS DateTimeOffset), CAST(N'2023-04-19T21:18:40.2590000+00:00' AS DateTimeOffset))
SET IDENTITY_INSERT [dbo].[tiketConfigurations] OFF
GO
