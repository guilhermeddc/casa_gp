"use client";

import { Profile } from "@/shared/types";
import { FiEdit, FiExternalLink } from "react-icons/fi";
import { DeleteProfileButton, ModalImagesButton } from "./components";
import Link from "next/link";
import Image from "next/image";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Tooltip } from "@mui/material";
import { ptBR } from "@mui/x-data-grid/locales";

interface ProfileTableProps {
  items: Profile[];
  onSuccess: () => void;
  onEdit?: (item: Profile) => void;
  loading?: boolean;
}

export const TableProfile: React.FC<ProfileTableProps> = ({
  items,
  onSuccess,
  onEdit,
  loading,
}) => {
  return (
    <Stack>
      <DataGrid
        loading={loading}
        rows={items}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        columns={[
          {
            field: "image",
            headerName: "Imagem",
            width: 100,
            renderCell: ({ value }) => (
              <Image
                src={value as string}
                alt="Imagem do professor"
                width={40}
                height={40}
                className="object-cover rounded bg-primary m-1 p-1"
              />
            ),
          },
          { field: "name", headerName: "Nome", flex: 1, minWidth: 200 },
          { field: "slug", headerName: "Slug", flex: 1, minWidth: 100 },
          { field: "age", headerName: "Idade", flex: 1, minWidth: 50 },
          { field: "weight", headerName: "Peso", flex: 1, minWidth: 50 },
          {
            field: "height",
            headerName: "Altura",
            flex: 1,
            minWidth: 50,
          },
          {
            field: "naturalness",
            headerName: "Naturalidade",
            flex: 1,
            minWidth: 150,
          },
          {
            field: "actions",
            headerName: "Ações",
            width: 170,
            renderCell: ({ row }) => (
              <div className="flex flex-1 items-center justify-center p-2 gap-2">
                <Tooltip title="Editar" arrow>
                  <button
                    onClick={() => onEdit?.(row)}
                    className="bg-stone-100 p-2 rounded shadow text-sm text-stone-500 hover:text-violet-500 hover:bg-stone-200 transition-all ease-in-out"
                  >
                    <FiEdit />
                  </button>
                </Tooltip>

                <ModalImagesButton id={row.id} />

                <Tooltip title="Ir para o site" arrow>
                  <Link
                    href={`/santa-maria-rs/${row.slug}`}
                    title="Ver detalhes"
                    target="_blank"
                    className="bg-stone-100 p-2 rounded shadow text-sm text-stone-500 hover:text-blue-500 hover:bg-stone-200 transition-all ease-in-out"
                  >
                    <FiExternalLink />
                  </Link>
                </Tooltip>

                <DeleteProfileButton itemId={row.id} onSuccess={onSuccess} />
              </div>
            ),
          },
        ]}
      />
    </Stack>
  );
};
