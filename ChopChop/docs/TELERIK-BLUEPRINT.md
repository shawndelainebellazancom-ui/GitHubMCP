# Telerik UI for Blazor Blueprint

Prereq: Active Telerik license. Add private NuGet feed and install package.

1) Edit `ChopChop.csproj` and uncomment:
```
<ItemGroup>
  <PackageReference Include="Telerik.UI.for.Blazor" Version="5.*" />
</ItemGroup>
```
2) Add in `_Imports.razor`:
```
@using Telerik.Blazor
@using Telerik.Blazor.Components
```
3) Replace Booking form with Telerik components (example):
```razor
@* Pages/Booking.razor *@
<TelerikForm Model="model" OnSubmit="OnSubmit">
  <FormValidation>
    <DataAnnotationsValidator />
  </FormValidation>
  <FormItems>
    <FormItem LabelText="Service">
      <Template>
        <TelerikDropDownList Data="Services" TextField="Name" ValueField="Id" @bind-Value="model.ServiceId" />
      </Template>
    </FormItem>
    <FormItem LabelText="Preferred Date">
      <Template>
        <TelerikDatePicker @bind-Value="model.Date" />
      </Template>
    </FormItem>
    <FormItem LabelText="Address">
      <Template>
        <TelerikTextBox @bind-Value="model.Address" />
      </Template>
    </FormItem>
    <FormItem LabelText="Contact">
      <Template>
        <TelerikTextBox @bind-Value="model.Contact" />
      </Template>
    </FormItem>
    <FormButtons>
      <TelerikButton ThemeColor="primary" Icon="check">Request Booking</TelerikButton>
    </FormButtons>
  </FormItems>
</TelerikForm>
```

4) Services listing with Grid:
```razor
<TelerikGrid Data="ServiceList" Pageable="true" PageSize="6" Height="400px">
  <GridColumns>
    <GridColumn Field="@nameof(Svc.Name)" Title="Service" />
    <GridColumn Field="@nameof(Svc.Description)" Title="Description" />
    <GridColumn Field="@nameof(Svc.Price)" Title="From" />
    <GridColumn Title="">
      <Template>
        <TelerikButton ThemeColor="primary" OnClick="() => Nav.NavigateTo($"/booking?service={context.Id}")">Book</TelerikButton>
      </Template>
    </GridColumn>
  </GridColumns>
</TelerikGrid>
```

Notes
- Swap default theme CDN in `wwwroot/index.html` to a Telerik theme CDN or local package CSS.
- Consider `<TelerikAppBar>` for header and `<TelerikDrawer>` for mobile navigation.
