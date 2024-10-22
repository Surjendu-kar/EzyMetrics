import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import LeadModal from "./LeadModal";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

const dummyLeads: Lead[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    status: "New",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "098-765-4321",
    status: "Contacted",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "555-555-5555",
    status: "Qualified",
  },
];

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(dummyLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewLead, setIsNewLead] = useState(false);

  const handleOpenModal = (lead: Lead | null, isNew: boolean = false) => {
    setSelectedLead(lead);
    setIsNewLead(isNew);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLead(null);
  };

  const handleSaveLead = (newLead: Omit<Lead, "id">) => {
    if (isNewLead) {
      const id = Math.max(...leads.map((lead) => lead.id)) + 1;
      setLeads([...leads, { ...newLead, id }]);
    } else if (selectedLead) {
      setLeads(
        leads.map((lead) =>
          lead.id === selectedLead.id ? { ...lead, ...newLead } : lead
        )
      );
    }
  };

  const handleDeleteLead = (leadId: number) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(leads.filter((lead) => lead.id !== leadId));
    }
  };

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4">Leads</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal(null, true)}
        >
          Add New Lead
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>
                  <Select
                    value={lead.status}
                    onChange={(e) =>
                      handleSaveLead({
                        ...lead,
                        status: e.target.value as string,
                      })
                    }
                    size="small"
                  >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Contacted">Contacted</MenuItem>
                    <MenuItem value="Qualified">Qualified</MenuItem>
                    <MenuItem value="Lost">Lost</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="View Details">
                      <IconButton
                        onClick={() => handleOpenModal(lead)}
                        color="primary"
                        size="small"
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => handleOpenModal(lead)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDeleteLead(lead.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <LeadModal
        open={modalOpen}
        onClose={handleCloseModal}
        lead={selectedLead}
        onSave={handleSaveLead}
        isNewLead={isNewLead}
      />
    </div>
  );
};

export default Leads;
