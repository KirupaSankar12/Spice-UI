import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../components/Home";
import App from "../App";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import DisplaySpiceMerchant from "../components/DisplaySpiceMerchant"; // Updated import for spice display component
import ApplyForm from "../components/ApplyForm"; // Form for applying to become a spice merchant

test("renders_home_component_with_title_and_description", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByText("Welcome to the Spice Merchant Franchise Application")).toBeInTheDocument(); // Updated title
  expect(screen.getByText(/Join our community of passionate spice merchants and share your unique spice blends!/)).toBeInTheDocument(); // Updated description
});

test("home_component_renders_get_your_spice_merchant_franchise_button_with_link_to_apply", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // Check if the "Apply Now" button is rendered with the correct link
  const applyButton = screen.getByText("Get Your Spice Merchant Franchise"); // Updated button text

  expect(applyButton).toBeInTheDocument();
  expect(applyButton).toHaveAttribute("href", "/apply");
});

test("renders_navbar_in_App_component_with_links", () => {
  render(<App />);

  // Update to match the rendered title
  const titleElement = screen.getByText("Spice Merchant Franchise Application"); 
  const homeLink = screen.getByText("Home");
  const spiceDetailsLink = screen.getByText("Spice Merchant Details");

  expect(titleElement).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
  expect(spiceDetailsLink).toBeInTheDocument();
});

test("checks_link_destinations", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  // Check if the links have the correct destinations
  const homeLink = screen.getByText("Home");
  const spiceDetailsLink = screen.getByText("Spice Merchant Details"); // Updated link text

  expect(homeLink).toHaveAttribute("href", "/");
  expect(spiceDetailsLink).toHaveAttribute("href", "/getAllSpiceMerchants"); // Updated route
});

test("renders_footer_component_with_copyright_text", () => {
  render(<Footer />);

  // Check if the copyright text is rendered
  const copyrightText = screen.getByText(
    /2024 Spice Merchant Franchise Application. All rights reserved./i // Updated copyright text
  );

  expect(copyrightText).toBeInTheDocument();
});

test("fetching_and_displaying_spice_applications", async () => {
  // Mocked data to simulate the response from the API
  const MOCK_DATA = [
    {
      name: "Spice King",
      spices: "Cumin, Coriander",
      experience: 5,
      storeLocation: "Market Street",
      phoneNumber: "1234567890",
    },
    {
      name: "Herb Haven",
      spices: "Basil, Oregano",
      experience: 3,
      storeLocation: "Garden Lane",
      phoneNumber: "0987654321",
    },
  ];

  // Mock the fetch function to return the mocked data
  const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(MOCK_DATA),
  });

  render(<DisplaySpiceMerchant />); // Updated to render DisplaySpice

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Check if each spice merchant is displayed in the table
  await waitFor(() => {
    MOCK_DATA.forEach((application) => {
      expect(screen.getByText(application.name)).toBeInTheDocument();
      expect(screen.getByText(application.spices)).toBeInTheDocument();
      expect(screen.getByText(application.experience)).toBeInTheDocument();
      expect(screen.getByText(application.storeLocation)).toBeInTheDocument();
      expect(screen.getByText(application.phoneNumber)).toBeInTheDocument();
    });
  });

  // Validate the fetch function call
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining("/getAllSpiceMerchants"), // Updated to match spice API
    expect.objectContaining({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
  fetchMock.mockRestore();
});

test('submits_valid_application_form', async () => {
  render(
    <MemoryRouter>
      <ApplyForm />
    </MemoryRouter>
  );

  // Check if the form has rendered correctly
  screen.debug(); // Add this line to log the current HTML structure

  // Fill in the form
  fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Spice Merchant' } });
  fireEvent.change(screen.getByLabelText('Spices:'), { target: { value: 'Cumin, Coriander' } });
  fireEvent.change(screen.getByLabelText('Experience (in years):'), { target: { value: 5 } }); // Update label text if needed
  fireEvent.change(screen.getByLabelText('Store Location:'), { target: { value: 'Market Street' } });
  fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { value: '1234567890' } });

  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true });

  // Submit the form
  fireEvent.click(screen.getByText('Submit Application'));

  // Wait for the success modal to appear
  await waitFor(() => {
    expect(screen.getByText('Application submitted successfully!')).toBeInTheDocument(); 
  });

  fetchMock.mockRestore();
});

test('submits_invalid_application_form', () => {
  render(
    <MemoryRouter>
      <ApplyForm />
    </MemoryRouter>
  );

  // Attempt to submit without filling in the form
  const submitButton = screen.getByText('Submit Application');
  fireEvent.click(submitButton);

  // Check for validation error messages
  expect(screen.getByText('Name is required')).toBeInTheDocument();
  expect(screen.getByText('Spices are required')).toBeInTheDocument(); // Updated validation message
  expect(screen.getByText('Experience is required')).toBeInTheDocument(); // Updated validation message
  expect(screen.getByText('Store location is required')).toBeInTheDocument(); // Updated validation message
  expect(screen.getByText('Phone Number is required')).toBeInTheDocument();
});

test('checks_all_components_and_routes', () => {
  render(<App />);
  
  const homeLink = screen.getByText(/Home/i);
  fireEvent.click(homeLink);
  expect(screen.getByText('Welcome to the Spice Merchant Franchise Application')).toBeInTheDocument(); // Updated title
  
  const applyLink = screen.getByText('Get Your Spice Merchant Franchise'); // Updated to match button text
  fireEvent.click(applyLink);
  expect(screen.getByText('Apply to Get a Franchise')).toBeInTheDocument(); // Update to match title

  const spiceDetailsLink = screen.getByText('Spice Merchant Details'); // Updated to match link text
  fireEvent.click(spiceDetailsLink);
  expect(screen.getByText('Submitted Merchant Applications for Franchise')).toBeInTheDocument(); // Update to match display title
});
