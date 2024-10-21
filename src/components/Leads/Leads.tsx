// Leads.tsx
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
} from "@mui/material";
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

  const handleOpenModal = (lead: Lead | null) => {
    setSelectedLead(lead);
    setIsNewLead(!lead);
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

  const handleChangeStatus = (leadId: number, newStatus: string) => {
    setLeads(
      leads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Leads
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal(null)}
        sx={{ mb: 2 }}
      >
        Add New Lead
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
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
                      handleChangeStatus(lead.id, e.target.value as string)
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
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenModal(lead)}
                  >
                    View Details
                  </Button>
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
