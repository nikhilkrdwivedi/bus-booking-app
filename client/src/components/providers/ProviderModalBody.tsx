import Fieldset from "@elements/Fieldset";
import Input from "@elements/Input";

export default function ProviderModalBody({ form, onChange }: any) {
  return (
    <>
      <Fieldset
        legend="Company"
        showLegend
        fieldsetClass="border border-gray-200 dark:border-gray-200 p-2"
        legendClass="text-white p-2"
      >
        <Input
          type="text"
          label="Company Name*"
          placeholder="eg: Nikhil Travels Private Limited"
          value={form?.company}
          onChange={(e: any) => onChange(e?.target?.value, "company", "")}
        />
      </Fieldset>
      <Fieldset
        legend="Address"
        showLegend
        fieldsetClass="border border-gray-200 dark:border-gray-200 p-2"
        legendClass="text-white p-2"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="Street(1)*"
            placeholder="eg: 17th Cross Rd"
            value={form?.address?.streetOne}
            onChange={(e: any) =>
              onChange(e?.target?.value, "streetOne", "address")
            }
          />
          <Input
            type="text"
            label="Street(2)"
            placeholder="eg: HSR Layout"
            value={form?.address?.streetTwo}
            onChange={(e: any) =>
              onChange(e?.target?.value, "streetTwo", "address")
            }
          />
          <Input
            type="text"
            label="City*"
            placeholder="eg: Bengaluru"
            value={form?.address?.city}
            onChange={(e: any) => onChange(e?.target?.value, "city", "address")}
          />
          <Input
            type="text"
            label="State*"
            placeholder="eg: Karnataka"
            value={form?.address?.state}
            onChange={(e: any) =>
              onChange(e?.target?.value, "state", "address")
            }
          />
          <Input
            type="text"
            label="Country*"
            placeholder="eg: India"
            value={form?.address?.country}
            onChange={(e: any) =>
              onChange(e?.target?.value, "country", "address")
            }
          />
          <Input
            type="text"
            label="Zip Code*"
            placeholder="eg: 656565"
            value={form?.address?.zipcode}
            onChange={(e: any) =>
              onChange(e?.target?.value, "zipcode", "address")
            }
          />
        </div>
      </Fieldset>
      <Fieldset
        legend="Contact"
        showLegend
        fieldsetClass="border border-gray-200 dark:border-gray-200 p-2"
        legendClass="text-white p-2"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="Mobile (with country code)*"
            placeholder="eg: 919898989898"
            value={form?.contact?.phone}
            onChange={(e: any) =>
              onChange(e?.target?.value, "phone", "contact")
            }
          />
          <Input
            type="text"
            label="Email*"
            placeholder="eg: atpl@gmail.com"
            value={form?.contact?.email}
            onChange={(e: any) =>
              onChange(e?.target?.value, "email", "contact")
            }
          />
        </div>
      </Fieldset>
    </>
  );
}
